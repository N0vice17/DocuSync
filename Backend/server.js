import Document from "./Schema/Document.js"
import dotenv from "dotenv"
import connectDB from "./Schema/db.js";
import { Server } from "socket.io"
import express from "express"
import http from "http"
import cors from "cors"
import router from "./routes/routes.js"

dotenv.config();

connectDB();

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

app.use(cors());
app.use(express.json());
app.use("/api", router);

const defaultValue = ""

io.on("connection", socket => {
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data })
    })

    socket.on("cursor-position", data => {
      socket.broadcast.to(documentId).emit("cursor-update", data)
    })
  })
})

async function findOrCreateDocument(id) {
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ _id: id, data: defaultValue })
}

server.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}`);
});
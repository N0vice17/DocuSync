import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import QuillCursors from "quill-cursors"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import "quill/dist/quill.snow.css"
import "../../App.css"

Quill.register("modules/cursors", QuillCursors)

const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
]

export default function TextEditor() {
    const { id: documentId } = useParams()
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()

    const username = "User-Anonymous";
    const userColor = `hsl(${Math.floor(Math.random() * 360)},75%,60%)`

    useEffect(() => {
        const s = io("http://localhost:3001")
        setSocket(s)
        return () => s.disconnect()
    }, [])

    useEffect(() => {
        if (!socket || !quill) return
        socket.once("load-document", doc => {
            quill.setContents(doc)
            quill.enable()
        })
        socket.emit("get-document", documentId)
    }, [socket, quill, documentId])

    useEffect(() => {
        if (!socket || !quill) return
        const iv = setInterval(() => {
            socket.emit("save-document", quill.getContents())
        }, SAVE_INTERVAL_MS)
        return () => clearInterval(iv)
    }, [socket, quill])

    useEffect(() => {
        if (!socket || !quill) return
        const handler = delta => quill.updateContents(delta)
        socket.on("receive-changes", handler)
        return () => socket.off("receive-changes", handler)
    }, [socket, quill])

    useEffect(() => {
        if (!socket || !quill) return
        const handler = (delta, oldDelta, source) => {
            if (source === "user") socket.emit("send-changes", delta)
        }
        quill.on("text-change", handler)
        return () => quill.off("text-change", handler)
    }, [socket, quill])

    useEffect(() => {
        if (!socket || !quill) return
        quill.on("selection-change", range => {
            if (!range) return
            socket.emit("cursor-position", {
                userId: socket.id,
                range,
                color: userColor,
                name: username,
            })
        })
    }, [socket, quill])

    useEffect(() => {
        if (!socket || !quill) return
        const cursors = quill.getModule("cursors")

        const handler = ({ userId, range, color, name }) => {
            if (userId === socket.id || !range) return
            cursors.createCursor(userId, name, color)
            cursors.moveCursor(userId, range)
        }

        socket.on("cursor-update", handler)
        return () => socket.off("cursor-update", handler)
    }, [socket, quill])

    const wrapperRef = useCallback(wrapper => {
        if (!wrapper) return
        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)

        const q = new Quill(editor, {
            theme: "snow",
            modules: {
                toolbar: TOOLBAR_OPTIONS,
                cursors: true,
            },
        })
        q.disable()
        q.setText("Loading...")
        setQuill(q)
    }, [])

    return <div className="container" ref={wrapperRef}></div>
}

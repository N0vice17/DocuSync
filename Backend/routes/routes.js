import express from "express"
import { login, register, user} from "../Controller/routecontroller.js"

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/user",user)

export default router
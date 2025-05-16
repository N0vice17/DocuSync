import User from "../Schema/User.js";
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

dotenv.config();

export async function login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ msg: "Invalid Credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.status(201).json({ token: token, userId: user._id, username: user.username })
}

export async function register(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(401).json({ msg: "Please provide all the redentials" });
        return;
    }
    const check = await User.findOne({ email });
    if (check) {
        res.status(401).json({ msg: "This email is already registered" });
        return;
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed })
    await user.save()
    res.status(201).json({ msg: "User Registered" });
}
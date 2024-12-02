import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { newUser, userExists } from '../services/UserService.js';

export const initAuthRoutes = (router) => {
    router.post('/auth/register', registerUser);
    router.post('/auth/login', loginUser);
}

// Register Route
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const exists = await userExists(email);
        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await newUser(username, email, password);

        res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

// Login Route
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userExists(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

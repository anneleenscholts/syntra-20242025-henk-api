import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { createUser, findOne } from '../repositories/UserRepository.js';
import { BadRequestError } from "../models/BadRequestError.js";

export const registerUser = async (username, email, password) => {
    const exists = await findOne(email);
    if (exists) {
        throw new BadRequestError("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, hashedPassword);
    return user;
}

export const loginUser = async (email, password) => {
    const user = await findOne(email);
    if (!user) {
        throw new BadRequestError("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new BadRequestError("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    return token;
};
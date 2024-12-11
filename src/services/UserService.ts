import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { createUser, findAll, findOne, findOneById, deleteById } from '../repositories/UserRepository.js';
import { BadRequestError } from "../models/errors/BadRequestError.js";
import { createGroup } from './GroupService.js';

export const registerUser = async (username: string, email: string, password: string) => {
    const exists = await findOne(email);
    if (exists) {
        throw new BadRequestError("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, hashedPassword);
    const defaultGroup = await createGroup("Default");
    await user.addGroup(defaultGroup);
    return user;
}

export const loginUser = async (email: string, password: string) => {
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

    const { password: pw, ...returnUser } = user.toJSON()
    return { token, returnUser };
};

export const getAllUsers = async () => {
    const users = await findAll();
    return users;
}

export const getUserById = async(id: number) => {
    const user = await findOneById(id);
    return user;
}

export const deleteUserById = async (id: number) => {
    const success = await deleteById(id);
    if (!success) {
        throw BadRequestError;
    } else {
        return true;
    }
}
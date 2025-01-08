import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { createUser, findAll, findOneById, deleteById, checkIfExists, findOneByEmail } from '../repositories/UserRepository.js';
import { BadRequestError } from "../models/errors/BadRequestError.js";
import { createGroup } from './GroupService.js';

export const registerUser = async (username: string, email: string, password: string, firstName: string, lastName: string, defaultLanguage?: string) => {
    const exists = await checkIfExists(email, username);
    if (exists) {
        throw new BadRequestError("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, hashedPassword, firstName, lastName, defaultLanguage ?? null);
    const defaultGroup = await createGroup(username);
    await user.addGroup(defaultGroup);
    return user;
}

export const loginUser = async (email: string, password: string) => {
    const user = await findOneByEmail(email);
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

export const getAllUsers = async () => {
    const users = await findAll();

    const returnUsers = users.map(user => {
        const { id, username, email } = user.toJSON();
        return {
            id, username, email
        }
    })
    return returnUsers;
}

export const getUserById = async (id: number) => {
    const user = await findOneById(id);
    const { password, ...returnUser } = user.toJSON();
    return returnUser;
}

export const deleteUserById = async (id: number) => {
    const success = await deleteById(id);
    if (!success) {
        throw new BadRequestError(`Could not delete user with id ${id}`);
    } else {
        return true;
    }
}
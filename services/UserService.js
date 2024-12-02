import bcrypt from 'bcryptjs';
import { createUser, findOne } from '../repositories/UserRepository.js';

export const userExists = async (email) => {
    return findOne(email);
}

export const newUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return createUser(username, email, hashedPassword);
}
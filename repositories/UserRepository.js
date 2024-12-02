import { User } from "../config/db.js";

export const findOne = async (email) => {
    return User.findOne({ where: { email } });
}

export const createUser = async (username, email, password) => {
    return User.create({ username, email, password });
}
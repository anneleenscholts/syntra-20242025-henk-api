import { User } from "../db/db.js";

export const findOne = async (email: string) => {
    return User.findOne({ where: { email } });
}

export const findOneById = async (id: number) => {
    return User.findOne({ where: { id } });
}

export const createUser = async (username: string, email: string, password: string) => {
    return User.create({ username, email, password });
}

export const findAll = async () => {
    return User.findAll();
}


export const deleteById = async (id: number) => {
    return User.destroy({ where: { id }, force: true });
}
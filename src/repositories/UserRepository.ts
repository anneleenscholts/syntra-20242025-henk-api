import { Op } from "sequelize";
import { User } from "../db/db.js";

export const checkIfExists = async (email: string, username: string) => {
    return User.findOne({
        where: {
            [Op.or]: [
                { email: email },
                { username: username }
            ]
        }
    });
}

export const findOneByEmail = async (email: string) => {
    return User.findOne({
        where: [{ email: email }]
    })
}

export const findOneById = async (id: number) => {
    return User.findOne({ where: { id } });
}

export const createUser = async (username: string, email: string, password: string, firstName: string, lastName: string, defaultLanguage?: string) => {
    const user = defaultLanguage ? { username, email, password, firstName, lastName, defaultLanguage } : { username, email, password, firstName, lastName }
    return User.create(user);
}

export const findAll = async () => {
    return User.findAll();
}


export const deleteById = async (id: number) => {
    return User.destroy({ where: { id }, force: true });
}
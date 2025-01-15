import { Op } from "sequelize";
import { User } from "../db/db.js";
import { IUserToCreate } from "../models/models.js";

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

export const createUser = async (userToCreate: IUserToCreate) => {
    return User.create(userToCreate);
}

export const findAll = async () => {
    return User.findAll();
}


export const deleteById = async (id: number) => {
    return User.destroy({ where: { id }, force: true });
}
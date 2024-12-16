import { Group } from "../db/db.js";

export const findOne = async (name: string) => {
    return Group.findOne({ where: { name } });
}

export const create = async (name: string) => {
    return Group.create({ name })
}

export const findAll = async () => {
    return Group.findAll();
}
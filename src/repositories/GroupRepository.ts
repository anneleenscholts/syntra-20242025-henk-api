import { Group } from "../db/db.js";

export const findOne = async (name: string) => {
    return Group.findOne({ where: { name } });
}

export const findOneById = async (id: number) => {
    return Group.findOne({ where: { id } });
}

export const create = async (name: string) => {
    return Group.create({ name })
}

export const findAll = async () => {
    return Group.findAll();
}

export const deleteById = async (id: number) => {
    return Group.destroy({ where: { id }, force: true });
}
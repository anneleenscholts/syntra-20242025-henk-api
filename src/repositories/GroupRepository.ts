import { Group, User } from "../db/db.js";

export const findOne = async (name: string) => {
    return Group.findOne({ where: { name } });
}

export const findOneById = async (id: number) => {
    return Group.findOne({ where: { id } });
}

export const create = async (name: string) => {
    return Group.create({ name })
}

export const findAll = async (userId) => {
    // return Group.findAll();
    const userWithGroups = await User.findAll({
        where: { id: userId },
        include: {
            model: Group,
            through: { attributes: [] }, // Exclude UserGroup attributes from the result
        },
    });

    if (userWithGroups.length !== 1) {
        return null;
    }

    return userWithGroups[0].Groups;
}

export const deleteById = async (id: number) => {
    return Group.destroy({ where: { id }, force: true });
}
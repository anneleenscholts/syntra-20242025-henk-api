import { Group, User } from "../db/db.js";

export const findOne = async (name: string) => {
  return Group.findOne({ where: { name } });
};

export const findOneById = async (id: number) => {
  return Group.findOne({ where: { id } });
};

export const findDefaultGroup = async (userId: number) => {
  return Group.findOne({
    where: { defaultGroup: true },
    include: {
      model: User,
      where: { id: userId },
      through: { attributes: [] },
    },
  });
};

export const create = async (
  name: string,
  defaultGroup: boolean = false,
  image?: string
) => {
  return Group.create({ name, defaultGroup, image });
};

export const findAll = async (userId) => {
  const userWithGroups = await User.findAll({
    where: { id: userId },
    include: {
      model: Group,
      through: { attributes: [] },
    },
  });

  if (userWithGroups.length !== 1) {
    return null;
  }

  return userWithGroups[0].Groups;
};

export const deleteById = async (id: number, force) => {
  const group = await Group.findOne({ where: { id } });
  if (group?.defaultGroup && !force) {
    throw new Error("Default groups cannot be deleted.");
  }
  return Group.destroy({ where: { id }, force: true });
};

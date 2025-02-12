import { Op } from "sequelize";
import { User, UserPreferences } from "../db/db.js";
import { IUserToCreate } from "../models/models.js";
import { IUserPreferences } from "../models/db/UserPreferences.js";

export const checkIfExists = async (email: string, username: string) => {
  return User.findOne({
    where: {
      [Op.or]: [{ email: email }, { username: username }],
    },
  });
};

export const findOneByEmail = async (email: string) => {
  return User.findOne({
    where: [{ email: email }],
  });
};

export const findOneById = async (id: number) => {
  return User.findOne({ where: { id } });
};

export const createUser = async (userToCreate: IUserToCreate) => {
  return User.create(userToCreate);
};

export const findAll = async () => {
  return User.findAll();
};

export const createUserPreferences = async (id: number) => {
  return UserPreferences.create({ userId: id });
};

export const getUserPreferences = async (id: number) => {
  return UserPreferences.findOne({
    where: { userId: id },
  });
};

export const updateUserPreferences = async (
  id: number,
  preferences: IUserPreferences
) => {
  return UserPreferences.update(preferences, {
    where: { userId: id },
  });
};

export const deleteById = async (id: number) => {
  return User.destroy({ where: { id }, force: true });
};

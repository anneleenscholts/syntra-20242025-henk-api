import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUser,
  findAll,
  findOneById,
  deleteById,
  checkIfExists,
  findOneByEmail,
  createUserPreferences,
  updateUserPreferences,
  getUserPreferences,
} from "../repositories/UserRepository.js";
import { BadRequestError } from "../models/errors/BadRequestError.js";
import { createGroup } from "./GroupService.js";
import { IUserToCreate } from "../models/models.js";
import { IUserPreferences } from "../models/db/UserPreferences.js";

export const registerUser = async (userToCreate: IUserToCreate) => {
  const exists = await checkIfExists(userToCreate.email, userToCreate.username);
  if (exists) {
    throw new BadRequestError("User already exists");
  }
  const hashedPassword = await bcrypt.hash(userToCreate.password, 10);
  const user = await createUser({ ...userToCreate, password: hashedPassword });
  const defaultGroup = await createGroup(userToCreate.username);
  await createUserPreferences(user.toJSON().id);

  await user.addGroup(defaultGroup);
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await findOneByEmail(email);
  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new BadRequestError("Invalid credentials");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

export const getAllUsers = async () => {
  const users = await findAll();

  const returnUsers = users.map((user) => {
    const { password, ...returnUser } = user.toJSON();
    return returnUser;
  });
  return returnUsers;
};

export const getUserById = async (id: number) => {
  const user = await findOneById(id);
  const { password, ...returnUser } = user.toJSON();
  return returnUser;
};

export const deleteUserById = async (id: number) => {
  const success = await deleteById(id);
  if (!success) {
    throw new BadRequestError(`Could not delete user with id ${id}`);
  } else {
    return true;
  }
};

export const savePreferencesForUser = async (
  preferences: IUserPreferences,
  id: number
) => {
  return updateUserPreferences(id, preferences);
};

export const getPreferencesForUser = async (id: number) => {
  const preferences = await getUserPreferences(id);
  return preferences.toJSON();
};

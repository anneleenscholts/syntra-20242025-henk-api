import { NextFunction, Request, Response, Router } from "express";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  savePreferencesForUser,
  getPreferencesForUser,
} from "../services/UserService.js";
import { jwtMiddleware } from "../middleware/errorHandling.js";

export const initUserRoutes = (router: Router) => {
  /**
   * GET /users
   * @security BearerAuth
   * @tags Users
   * @summary Get all users
   * @description Get all users that you have access to (to be defined what this means?)
   * @return {array<UserDTO>} 200 - Array of Users
   */
  router.get("/users", jwtMiddleware, getUsers);

  /**
   * PUT /users/preferences
   * @security BearerAuth
   * @tags Users
   * @summary Save the user preferences
   * @description Save the user preferences for the logged in user
   * @param {UserPreferences} request.body.required - User preferences
   * @return {UserPreferences} 201 - User preferences
   */
  router.put("/users/preferences", jwtMiddleware, saveUserPreferences);

  /**
   * GET /users/preferences
   * @security BearerAuth
   * @tags Users
   * @summary Get the user preferences
   * @description Get the user preferences for the logged in user
   * @return {UserPreferences} 201 - User preferences
   */
  router.get("/users/preferences", jwtMiddleware, getUserPreferences);

  /**
   * GET /users/:id
   * @security BearerAuth
   * @tags Users
   * @summary Get user by id
   * @description Get specific user if you have access to that user (to be defined what this means)
   * @param {string} id.query.required - The id of the user you want to fetch
   * @return {UserDTO} 200 - User object
   */
  router.get("/users/:id", jwtMiddleware, getUser);

  /**
   * DELETE /users/:id
   * @security BearerAuth
   * @tags Users
   * @summary Delete a user by id
   * @description Delete a specific user if you have access to that user (to be defined what this means)
   * @param {string} id.query.required - The id of the user you want to delete
   * @return 200
   */
  router.delete("/users/:id", jwtMiddleware, deleteUser);
};

const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    const user = await getUserById(Number(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    await deleteUserById(Number(req.params.id));
    res.status(200);
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

const saveUserPreferences = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    const preferences = await savePreferencesForUser(
      { ...req.body },
      Number(req.user.userId)
    );
    res.status(200).json(preferences);
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

const getUserPreferences = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    const preferences = await getPreferencesForUser(Number(req.user.userId));
    res.status(200).json(preferences);
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

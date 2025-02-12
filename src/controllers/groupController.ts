import { NextFunction, Request, Response, Router } from "express";
import {
  createGroup,
  deleteGroupById,
  getAllGroupsForUser,
  getGroupById,
  inviteUser,
} from "../services/GroupService.js";
import { jwtMiddleware } from "../middleware/errorHandling.js";

/**
 * A User
 * @typedef {object} Group
 * @property {string} name.required - Name
 */

export const initGroupRoutes = (router: Router) => {
  /**
   * GET /groups
   * @security BearerAuth
   * @tags Groups
   * @summary Get all groups (you have access to)
   * @description Get all groups that you have access to (to be defined what this means)
   */
  router.get("/groups", jwtMiddleware, getGroups);
  /**
   * GET /groups/:id
   * @security BearerAuth
   * @tags Groups
   * @summary Get a group
   * @description Get a group by group id
   * @param {string} id.query.required - The id of the group you want to fetch
   * @return {Group} 200 - Successful
   */
  router.get("/groups/:id", jwtMiddleware, getGroup);

  /**
   * DELETE /groups/:id
   * @security BearerAuth
   * @tags Groups
   * @summary Delete a group by id
   * @description Delete a specific group if you have access to that user (to be defined what this means)
   * @param {string} id.query.required - The id of the group you want to delete
   * @return 200
   */
  router.delete("/groups/:id", jwtMiddleware, deleteGroup);
  /**
   * POST /groups
   * @security BearerAuth
   * @tags Groups
   * @summary Create a group
   * @description Create a new group
   * @param {Group} request.body.required - Group name
   * @return {Group} 201 - Successful
   */
  router.post("/groups", jwtMiddleware, createNewGroup);

  /**
   * POST /groups/:id/invites/:userId
   * @security BearerAuth
   * @tags Groups
   * @summary Invite a user to a group
   * @description Invite a user to a specific group that is defined by the group id
   * @param {string} id.query.required - Group id
   * @param {string} userId.query.required - User id
   * @return 200 - Successful
   */

  router.post("/groups/:id/invites/:userId", jwtMiddleware, inviteUserToGroup);
};

const getGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    const groups = await getAllGroupsForUser(Number(req.user.userId));
    res.status(200).json(groups);
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

const getGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    const user = await getGroupById(Number(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

const deleteGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    await deleteGroupById(Number(req.params.id));
    res.status(200).json({});
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

const createNewGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  const { name } = req.body;
  try {
    const group = await createGroup(name, Number(req.user.userId));
    res.status(201).json({ message: "Group created successfully", group });
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

const inviteUserToGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    const groupid = req.params.id;
    const userId = req.params.userId;
    await inviteUser(Number(groupid), Number(userId), Number(req.user.userId));
    res.status(200).json({ message: "User successfully invited" });
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

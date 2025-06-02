import { NextFunction, Request, Response, Router } from "express";
import {
  createGroup,
  deleteGroupById,
  getAllGroupsForUser,
  getGroupById,
  inviteUser,
  leaveGroup,
} from "../services/GroupService.js";
import { jwtMiddleware } from "../middleware/errorHandling.js";

export const initGroupRoutes = (router: Router) => {
  /**
   * POST /groups/{id}/invites
   * @security BearerAuth
   * @tags Groups
   * @summary Invite a user to a group
   * @description Invite a user to a specific group that is defined by the group id
   * @param {string} id.path.required - Group id
   * @param {UserToInvite} request.body.required - Email
   * @return 200 - Successful
   */

  router.post("/groups/:id/invites", jwtMiddleware, inviteUserToGroup);

  /**
   * POST /groups/{id}/leave
   * @security BearerAuth
   * @tags Groups
   * @summary Leave a group
   * @description Leave a specific group that is defined by the group id
   * @param {string} id.path.required - Group id
   * @return 200 - Successful
   */

  router.post("/groups/:id/leave", jwtMiddleware, leaveGroupById);

  /**
   * GET /groups/:id
   * @security BearerAuth
   * @tags Groups
   * @summary Get a group
   * @description Get a group by group id
   * @param {string} id.path.required - The id of the group you want to fetch
   * @return {Group} 200 - Successful
   */
  router.get("/groups/:id", jwtMiddleware, getGroup);

  /**
   * GET /groups
   * @security BearerAuth
   * @tags Groups
   * @summary Get all groups (you have access to)
   * @description Get all groups that you have access to (to be defined what this means)
   * @return {array<Group>} 200 - Successful
   */
  router.get("/groups", jwtMiddleware, getGroups);

  /**
   * DELETE /groups/:id
   * @security BearerAuth
   * @tags Groups
   * @summary Delete a group by id
   * @description Delete a specific group if you have access to that user (to be defined what this means)
   * @param {string} id.path.required - The id of the group you want to delete
   * @return 200
   */
  router.delete("/groups/:id", jwtMiddleware, deleteGroup);

  /**
   * POST /groups
   * @security BearerAuth
   * @tags Groups
   * @summary Create a group
   * @description Create a new group
   * @param {CreateGroup} request.body.required - Group name
   * @return {Group} 201 - Successful
   */
  router.post("/groups", jwtMiddleware, createNewGroup);
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
  const { name, image } = req.body;
  try {
    const group = await createGroup(
      name,
      false,
      image,
      Number(req.user.userId)
    );
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
    const { email } = req.body;
    await inviteUser(Number(groupid), email, Number(req.user.userId));
    res.status(200).json({ message: "User successfully invited" });
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

const leaveGroupById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    const groupid = req.params.id;
    await leaveGroup(Number(groupid), Number(req.user.userId));
    res.status(200).json({ message: "You have left the group" });
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

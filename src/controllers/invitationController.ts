import { NextFunction, Request, Response, Router } from "express";
import { jwtMiddleware } from "../middleware/errorHandling.js";
import {
  acceptInvitationForGroup,
  getAllInvitations,
} from "../services/InvitationService.js";

export const initInvitationsRoutes = (router: Router) => {
  /**
   * GET /invitations
   * @security BearerAuth
   * @tags Invitations
   * @summary Get all invitations
   * @description Get all invitations for your user
   * @return {array<Invitation>} 200 - Successful
   */
  router.get("/invitations", jwtMiddleware, getInvitationsList);
  /**
   * POST /invitations/:id/accept
   * @security BearerAuth
   * @tags Invitations
   * @summary Accept an invitation
   * @description Accept an invitation by id
   * @param {string} id.query.required - The id of the invitation you want to accept
   * @return 200
   */
  router.post("/invitations/:id/accept", jwtMiddleware, acceptInvitation);
};

const getInvitationsList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const invitee = req.user.userId;
  try {
    const invitations = await getAllInvitations(invitee);
    res.json(invitations).status(200);
  } catch (error) {
    next(error);
  }
};

const acceptInvitation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const invitee = req.user.userId;
  const invitationId = Number(req.params.id);
  try {
    await acceptInvitationForGroup(invitee, invitationId);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

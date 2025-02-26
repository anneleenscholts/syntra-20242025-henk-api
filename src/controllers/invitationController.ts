import { NextFunction, Request, Response, Router } from "express";
import { jwtMiddleware } from "../middleware/errorHandling.js";
import { getAllInvitations } from "../services/InvitationService.js";

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

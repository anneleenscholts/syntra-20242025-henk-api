import { Invitation } from "../db/db.js";

export const createInvitation = async (
  invitedBy: number,
  invitee: number,
  invitedFor: number
) => {
  return Invitation.create({
    invitedBy,
    invitee,
    invitedFor,
  });
};

import { Invitation } from "../db/db.js";
import { User, Group } from "../db/db.js";

export const createInvitation = async (
  invitedById: number,
  inviteeId: number,
  invitedForId: number
) => {
  return Invitation.create({
    invitedById,
    inviteeId,
    invitedForId,
  });
};

export const getInvitations = async (invitee: number) => {
  return Invitation.findAll({
    where: {
      inviteeId: invitee,
    },
    include: [
      {
        model: User,
        as: "invitedBy",
        attributes: { exclude: ["password"] },
      },
      {
        model: User,
        as: "invitee",
        attributes: { exclude: ["password"] },
      },
      {
        model: Group,
        as: "invitedFor",
      },
    ],
    attributes: { exclude: ["invitedById", "inviteeId", "invitedForId"] },
  });
};

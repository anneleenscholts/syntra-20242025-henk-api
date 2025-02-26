import {
  getInvitationById,
  getInvitations,
} from "../repositories/InvitationRepository.js";
import { getUserById } from "./UserService.js";

export async function getAllInvitations(invitee: number) {
  return getInvitations(invitee);
}

export async function acceptInvitationForGroup(
  invitee: number,
  invitationId: number
) {
  // accept invitation
  const invitation = await getInvitationById(invitationId);
  if (invitation.inviteeId !== invitee) {
    throw new Error("You can't accept this invitation");
  }
  // Add user to group in invitation
  const group = await invitation.getInvitedFor();
  group.addUser(invitee);
  // Remove invitation
  return await invitation.destroy();
}

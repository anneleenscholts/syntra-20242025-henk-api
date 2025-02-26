import {
  getInvitationById,
  getInvitations,
  removeInvitation,
} from "../repositories/InvitationRepository.js";

export async function getAllInvitations(invitee: number) {
  return getInvitations(invitee);
}

export async function acceptInvitationForGroup(
  invitee: number,
  invitationId: number
) {
  // accept invitation
  const invitation = await getInvitationById(invitationId);
  if (!invitation || invitation.inviteeId !== invitee) {
    throw new Error("You can't accept this invitation");
  }
  // Add user to group in invitation
  const group = await invitation.getInvitedFor();
  group.addUser(invitee);
  // Remove invitation
  return removeInvitation(invitationId);
}

export async function rejectInvitationForGroup(
  invitee: number,
  invitationId: number
) {
  // reject invitation
  const invitation = await getInvitationById(invitationId);
  if (!invitation || invitation.inviteeId !== invitee) {
    throw new Error("You can't reject this invitation");
  }
  // Remove invitation
  return removeInvitation(invitationId);
}

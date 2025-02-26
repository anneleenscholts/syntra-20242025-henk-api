import { getInvitations } from "../repositories/InvitationRepository.js";

export async function getAllInvitations(invitee: number) {
  return getInvitations(invitee);
}

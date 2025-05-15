import { BadRequestError } from "../models/errors/BadRequestError.js";
import {
  findOne,
  findAll,
  create,
  findOneById,
  deleteById,
  findDefaultGroup,
} from "../repositories/GroupRepository.js";
import { createInvitation } from "../repositories/InvitationRepository.js";
import { findOneById as findUserById } from "../repositories/UserRepository.js";

export async function createGroup(
  name: string,
  defaultGroup: boolean = false,
  image?: string,
  userId?: number
) {
  const group = await create(name, defaultGroup, image);
  if (userId) {
    const user = await findUserById(userId);
    await group.addUser(user);
  }
  return group;
}

export function getDefaultGroupForUser(userId: number) {
  return findDefaultGroup(userId);
}

export function getGroupById(id: number) {
  if (!id) {
    throw new BadRequestError("No group id provided");
  }
  return findOneById(id);
}

export function getAllGroupsForUser(userId: number) {
  return findAll(userId);
}

export async function deleteGroupById(id: number, force = false) {
  try {
    return await deleteById(id, force);
  } catch (error) {
    throw new BadRequestError(`Could not delete group with id ${id}`);
  }
}

export async function inviteUser(
  groupId: number,
  userToInvite: number,
  inviterId: number
) {
  const user = await findUserById(userToInvite);
  if (!user) {
    throw new BadRequestError("Could not find user to invite");
  }
  const inviter = await findUserById(inviterId);
  const inviterGroups = await inviter.getGroups();
  const exists = inviterGroups.findIndex(
    (group) => group.toJSON().id === groupId
  );
  if (exists < 0) {
    throw new BadRequestError("Cannot invite user to group");
  }
  return createInvitation(inviterId, userToInvite, groupId);
}

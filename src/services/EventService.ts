import { BadRequestError } from "../models/errors/BadRequestError.js";
import { NotFoundError } from "../models/errors/NotFoundError.js";
import { IEventToCreate } from "../models/models.js";
import {
  createEvent,
  findAllPersonalEvents,
  findAllUserEvents,
} from "../repositories/EventRepository.js";
import { findOneById as findUserById } from "../repositories/UserRepository.js";
import { getDefaultGroupForUser, getGroupById } from "./GroupService.js";

export async function createNewEventForGroup(
  eventToCreate: IEventToCreate,
  userId: number,
  groupId: number
) {
  const event = await createEvent({ ...eventToCreate, organizer: userId });
  let group;
  if (groupId) {
    group = await getGroupById(groupId);
  } else {
    group = await getDefaultGroupForUser(userId);
  }
  if (!group) {
    throw new NotFoundError(
      "Could not find group - Maybe the group was deleted or the user is not a member of the group"
    );
  }
  await group.addEvent(event);
  return { ...event.toJSON(), groupId: group.toJSON().id };
}

export async function getAllEventsForAUser(
  userId: number,
  from: Date,
  to: Date,
  groupId?: number,
  personal: boolean = false
) {
  if (personal) {
    return findAllPersonalEvents(userId, from, to);
  }
  const user = await findUserById(userId);
  const groups = await user.getGroups();
  if (groupId) {
    const exists = groups.findIndex((group) => group.toJSON().id === groupId);
    if (exists < 0) {
      throw new BadRequestError("User is not a member of the group");
    }
  }
  return findAllUserEvents(userId, from, to, groupId);
}

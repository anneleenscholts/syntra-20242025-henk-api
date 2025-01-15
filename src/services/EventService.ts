import { createEvent, findAllUserEvents } from '../repositories/EventRepository.js';
import { findOneById as findUserById } from '../repositories/UserRepository.js';
import { getGroupById, getGroupByName } from './GroupService.js';


export async function createNewEventForGroup(eventToCreate: { title: string, description: string, end: string, start: string }, userId: number, groupId: number) {
    const event = await createEvent({ ...eventToCreate, organizer: userId });
    let group;
    if (groupId) {
        group = await getGroupById(groupId);
    } else {        
        const user = await findUserById(userId)
        group = await getGroupByName(user.toJSON().username)
        console.log(group);
    }
    await group.addEvent(event);
    return { ...event.toJSON(), groupId: group.toJSON().id };
}

export function getAllEventsForAUser(userId: number) {
    return findAllUserEvents(userId)
}

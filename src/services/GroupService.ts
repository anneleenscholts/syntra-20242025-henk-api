import { BadRequestError } from '../models/errors/BadRequestError.js';
import { findOne, findAll, create, findOneById, deleteById } from '../repositories/GroupRepository.js';
import { findOneById as findUserById } from '../repositories/UserRepository.js';


export async function createGroup(name: string, userId?: number) {
    const group = await create(name);
    if (userId) {
        const user = await findUserById(userId);
        await group.addUser(user);
    }
    return group;
}

export function getGroupByName(name: string) {
    return findOne(name);
}

export function getGroupById(id: number) {
    return findOneById(id);
}

export function getAllGroupsForUser(userId: number) {
    return findAll(userId)
}

export async function deleteGroupById(id: number) {
    const success = await deleteById(id);
    if (!success) {
        throw new BadRequestError(`Could not delete group with id ${id}`);
    } else {
        return true;
    }
}
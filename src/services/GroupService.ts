import { BadRequestError } from '../models/errors/BadRequestError.js';
import { findOne, findAll, create, findOneById, deleteById } from '../repositories/GroupRepository.js';


export function createGroup(name: string) {
    return create(name);
}

export function getGroupByName(name: string) {
    return findOne(name);
}

export function getGroupById(id: number) {
    return findOneById(id);
}

export function getAllGroups() {
    return findAll()
}

export async function deleteGroupById(id: number) {
    const success = await deleteById(id);
    if (!success) {
        throw new BadRequestError(`Could not delete group with id ${id}`);
    } else {
        return true;
    }
}
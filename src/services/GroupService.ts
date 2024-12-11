import { findOne, create } from '../repositories/GroupRepository.js';


export function createGroup(name: string) {
    return create(name);
}

export function getGroupByName(name: string) {
    return findOne(name);
}
import { Op } from "sequelize";
import { Event } from "../db/db.js";

export const createEvent = async (evenToCreate: { title: string, description: string, end: string, start: string, organizer: number }) => {
    return Event.create(evenToCreate);
}

export const findAllEvents = async () => {
    return Event.findAll();
}

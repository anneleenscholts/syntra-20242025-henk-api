import { Event, Group, User } from "../db/db.js";
import { IEvent } from "../models/models.js";

export const createEvent = async (evenToCreate: IEvent) => {
    return Event.create(evenToCreate);
}

export const findAllUserEvents = async (userId) => {
    const events = await Event.findAll({
        include: [
            {
                model: Group,
                attributes: [],
                required: true,
                include: [
                    {
                        model: User,
                        attributes: [],
                        where: { id: userId },
                        through: { attributes: [] },
                    },
                ],
            },
        ],
    });

    return events;
}

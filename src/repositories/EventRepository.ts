import { Event, Group, User } from "../db/db.js";

export const createEvent = async (evenToCreate: { title: string, description: string, end: string, start: string, organizer: number }) => {
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

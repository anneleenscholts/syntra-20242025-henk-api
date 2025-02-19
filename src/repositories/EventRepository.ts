import { Op, where } from "sequelize";
import { Event, Group, User } from "../db/db.js";
import { IEvent } from "../models/models.js";

export const createEvent = async (evenToCreate: IEvent) => {
  return Event.create(evenToCreate);
};

export const findAllUserEvents = async (userId, from, to) => {
  const whereClause: any = {};

  if (from) {
    whereClause.start = { [Op.gte]: from };
  }

  if (to) {
    whereClause.end = { [Op.lte]: to };
  }
  const events = await Event.findAll({
    where: whereClause,
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
};

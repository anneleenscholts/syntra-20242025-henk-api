import { Op } from "sequelize";
import { Event, Group, User } from "../db/db.js";
import { IEvent } from "../models/models.js";

export const createEvent = async (evenToCreate: IEvent) => {
  return Event.create(evenToCreate);
};

export const findAllUserEvents = async (
  userId: number,
  from?: Date,
  to?: Date,
  groupId?: number
) => {
  const whereClause: any = {};

  if (from) {
    whereClause.start = { [Op.gte]: from };
  }

  if (to) {
    whereClause.end = { [Op.lte]: to };
  }

  const user = await User.findByPk(userId, {
    attributes: ["username"],
  });

  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }

  const whereClauseGroup: any = {
    defaultGroup: false,
  };

  if (groupId) {
    whereClauseGroup.id = groupId;
  }

  const events = await Event.findAll({
    where: whereClause,
    include: [
      {
        model: Group,
        required: true,
        where: whereClauseGroup,
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

export const findAllPersonalEvents = async (
  userId: number,
  from?: Date,
  to?: Date
) => {
  const whereClause: any = {};

  if (from) {
    whereClause.start = { [Op.gte]: from };
  }

  if (to) {
    whereClause.end = { [Op.lte]: to };
  }

  const user = await User.findByPk(userId, {
    attributes: ["username"],
  });

  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }

  const whereClauseGroup: any = {
    defaultGroup: true,
  };

  const events = await Event.findAll({
    where: whereClause,
    include: [
      {
        model: Group,
        required: true,
        where: whereClauseGroup,
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

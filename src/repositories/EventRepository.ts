import { Op, where, col, fn } from "sequelize";
import { Event, Group, User } from "../db/db.js";
import { IEvent } from "../models/models.js";
import sequelize from "sequelize";

export const createEvent = async (evenToCreate: IEvent) => {
  return Event.create(evenToCreate);
};

export const findAllUserEvents = async (
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

  // First, get the username for the user with the given userId
  const user = await User.findByPk(userId, {
    attributes: ["username"],
  });

  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }

  const username = user.username;

  // Now query for events
  const events = await Event.findAll({
    where: whereClause,
    include: [
      {
        model: Group,
        required: true,
        where: {
          [Op.not]: {
            name: username.toLowerCase(), // Compare with the actual username value
          },
        },
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

  // First, get the username for the user with the given userId
  const user = await User.findByPk(userId, {
    attributes: ["username"],
  });

  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }

  const username = user.username;

  // Now query for events where the group name matches the username
  const events = await Event.findAll({
    where: whereClause,
    include: [
      {
        model: Group,
        required: true,
        where: {
          name: username.toLowerCase(), // Match groups with name equal to username
        },
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

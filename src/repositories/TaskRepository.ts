import { Task } from "../db/db.js";
import { ITask } from "../models/db/Task.js";

export const createTask = async (taskToCreate: ITask) => {
  return Task.create(taskToCreate);
};

export const findAllUserTasks = async (userId) => {
  const events = await Task.findAll({
    where: { userId },
  });

  return events;
};

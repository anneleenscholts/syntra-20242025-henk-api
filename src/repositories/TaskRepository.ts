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

export const findOneTaskById = async (taskId, userId) => {
  const task = await Task.findOne({
    where: { id: taskId, userId },
  });

  return task;
};

export const deleteTaskById = async (taskId, userId) => {
  const task = await Task.findOne({
    where: { id: taskId, userId },
  });

  if (!task) {
    return null;
  }

  await task.destroy();

  return task;
};

import { Task } from "../db/db.js";
import { ITask } from "../models/db/Task.js";

export const createTask = async (taskToCreate: ITask) => {
  return Task.create(taskToCreate);
};

export const findAllUserTasks = async (userId, completed?) => {
  let whereClause = {
    userId,
  };
  if (completed !== null) {
    whereClause = {
      ...whereClause,
      ...{ completed },
    };
  }
  const events = await Task.findAll({
    where: whereClause,
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

export const updateTaskById = async (taskId, userId, task) => {
  const [updated] = await Task.update(task, {
    where: { id: taskId, userId },
  });

  if (updated === 0) {
    return null;
  }

  return updated;
};

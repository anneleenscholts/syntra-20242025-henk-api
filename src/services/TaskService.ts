import { ITask } from "../models/db/Task.js";
import {
  createTask,
  findAllUserTasks,
  findOneTaskById,
} from "../repositories/TaskRepository.js";

export function createNewTaskForUser(taskToCreate) {
  return createTask(taskToCreate);
}

export function getAllTasksForUser(userId: number) {
  return findAllUserTasks(userId);
}

export function getTaskByIdForUser(taskId: number, userId: number) {
  return findOneTaskById(taskId, userId);
}

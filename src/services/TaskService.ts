import { ITask } from "../models/db/Task.js";
import {
  createTask,
  findAllUserTasks,
} from "../repositories/TaskRepository.js";

export function createNewTaskForUser(taskToCreate) {
  return createTask(taskToCreate);
}

export function getAllTasksForUser(userId: number) {
  return findAllUserTasks(userId);
}

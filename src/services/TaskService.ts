import { ITask } from "../models/db/Task.js";
import {
  createTask,
  deleteTaskById,
  findAllUserTasks,
  findOneTaskById,
  updateTaskById,
} from "../repositories/TaskRepository.js";

export function createNewTaskForUser(taskToCreate) {
  return createTask(taskToCreate);
}

export function getAllTasksForUser(userId: number, completed?: boolean) {
  return findAllUserTasks(userId, completed ?? null);
}

export function getTaskByIdForUser(taskId: number, userId: number) {
  return findOneTaskById(taskId, userId);
}

export function deleteTaskByIdForUser(taskId: number, userId: number) {
  return deleteTaskById(taskId, userId);
}
export function updateTaskByIdForUser(
  taskId: number,
  userId: number,
  task: Partial<ITask>
) {
  return updateTaskById(taskId, userId, task);
}

export function completeTaskByIdForUser(taskId: number, userId: number) {
  return updateTaskById(taskId, userId, { completed: true });
}

export function uncompleteTaskByIdForUser(taskId: number, userId: number) {
  return updateTaskById(taskId, userId, { completed: false });
}

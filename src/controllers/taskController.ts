import { NextFunction, Request, Response, Router } from "express";
import { jwtMiddleware } from "../middleware/errorHandling.js";
import {
  createNewTaskForUser,
  getAllTasksForUser,
} from "../services/TaskService.js";

export const initTaskRoutes = (router: Router) => {
  /**
   * GET /tasks
   * @security BearerAuth
   * @tags Tasks
   * @summary Get all tasks
   * @description Get all your personal tasks
   * @return {array<CreatedTask>} 200 - Array of tasks
   */
  router.get("/tasks", jwtMiddleware, getTasks);

  /**
   * POST /tasks
   * @security BearerAuth
   * @tags Tasks
   * @summary Create a task
   * @description Create a new task
   * @param {Task} request.body.required - Task details
   * @return {CreatedTask} 201 - Successful
   */
  router.post("/tasks", jwtMiddleware, createNewTask);
};

const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    const tasks = await getAllTasksForUser(Number(req.user.userId));
    res.status(200).json(tasks);
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

const createNewTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  const { title, description, dueDate } = req.body;

  try {
    // Create a new task
    const created = await createNewTaskForUser({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      userId: req.user.userId,
    });
    res.status(201).json(created);
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

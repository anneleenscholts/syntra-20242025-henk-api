import { NextFunction, Request, Response, Router } from "express";
import { jwtMiddleware } from "../middleware/errorHandling.js";
import {
  completeTaskByIdForUser,
  createNewTaskForUser,
  deleteTaskByIdForUser,
  getAllTasksForUser,
  getTaskByIdForUser,
  uncompleteTaskByIdForUser,
  updateTaskByIdForUser,
} from "../services/TaskService.js";

export const initTaskRoutes = (router: Router) => {
  /**
   * GET /tasks
   * @security BearerAuth
   * @tags Tasks
   * @summary Get all tasks
   * @description Get all your personal tasks
   * @param {boolean} completed.query.optional - Filter by completed status
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

  /**
   * POST /tasks/{taskId}/complete
   * @security BearerAuth
   * @tags Tasks
   * @summary Mark a task as complete
   * @description Mark a task as complete
   * @param {number} taskId.path.required - Task ID
   * @return {CreatedTask} 200 - Task marked as complete
   */
  router.post("/tasks/:taskId/complete", jwtMiddleware, completeTaskById);

  /**
   * POST /tasks/{taskId}/uncomplete
   * @security BearerAuth
   * @tags Tasks
   * @summary Mark a task as incomplete
   * @description Mark a task as incomplete
   * @param {number} taskId.path.required - Task ID
   * @return {CreatedTask} 200 - Task marked as incomplete
   */
  router.post("/tasks/:taskId/uncomplete", jwtMiddleware, uncompleteTaskById);

  /**
   * GET /tasks/{taskId}
   * @security BearerAuth
   * @tags Tasks
   * @summary Get a task
   * @description Get a task by its ID
   * @param {number} taskId.path.required - Task ID
   * @return {CreatedTask} 200 - Task found
   */
  router.get("/tasks/:taskId", jwtMiddleware, getTaskById);

  /**
   * PUT /tasks/{taskId}
   * @security BearerAuth
   * @tags Tasks
   * @summary Update a task
   * @description Update a task by its ID
   * @param {number} taskId.path.required - Task ID
   * @param {Task} request.body.required - Task details
   * @return {CreatedTask} 200 - Task updated
   */
  router.put("/tasks/:taskId", jwtMiddleware, updateTaskById);

  /**
   * DELETE /tasks/{taskId}
   * @security BearerAuth
   * @tags Tasks
   * @summary Delete a task
   * @description Delete a task by its ID
   * @param {number} taskId.path.required - Task ID
   * @return {string} 200 - Task deleted
   */
  router.delete("/tasks/:taskId", jwtMiddleware, deleteTaskById);
};

const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  const { completed } = req.query;
  try {
    const tasks = await getAllTasksForUser(
      Number(req.user.userId),
      completed ? Boolean(completed === "true") : null
    );
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

const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    const task = await getTaskByIdForUser(
      Number(req.params.taskId),
      Number(req.user.userId)
    );
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

const deleteTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    const task = await deleteTaskByIdForUser(
      Number(req.params.taskId),
      Number(req.user.userId)
    );
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

const updateTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    const { title, description, dueDate } = req.body;

    const task = await updateTaskByIdForUser(
      Number(req.params.taskId),
      Number(req.user.userId),
      {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
      }
    );
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

const completeTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    const taskId = Number(req.params.taskId);
    const userId = Number(req.user.userId);
    const task = await completeTaskByIdForUser(taskId, userId);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.status(200).json({ message: "Task marked as complete" });
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

const uncompleteTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    const taskId = Number(req.params.taskId);
    const userId = Number(req.user.userId);
    const task = await uncompleteTaskByIdForUser(taskId, userId);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.status(200).json({ message: "Task marked as incomplete" });
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

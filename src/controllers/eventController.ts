import { NextFunction, Request, Response, Router } from "express";
import { jwtMiddleware } from "../middleware/errorHandling.js";
import {
  createNewEventForGroup,
  getAllEventsForAUser,
} from "../services/EventService.js";

export const initEventRoutes = (router: Router) => {
  /**
   * GET /events
   * @security BearerAuth
   * @tags Events
   * @summary Get all events (you have access to)
   * @description Get all events that you have access to
   * @return {array<CreatedEvent>} 200 - Array of events
   */
  router.get("/events", jwtMiddleware, getEvents);

  /**
   * POST /events
   * @security BearerAuth
   * @tags Events
   * @summary Create an event
   * @description Create a new event. If you pass it a groupId, the event is created for this group. If you don't pass it a groupId, the event will be created for your default group (= personal agenda)
   * @param {Event} request.body.required - Event details
   * @return {CreatedEvent} 201 - Successful
   */
  router.post("/events", jwtMiddleware, createNewEvent);
};

const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    const events = await getAllEventsForAUser(Number(req.user.userId));
    res.status(200).json(events);
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

const createNewEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  const { groupId, ...eventToCreate } = req.body;
  try {
    const event = await createNewEventForGroup(
      eventToCreate,
      Number(req.user.userId),
      Number(groupId)
    );
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

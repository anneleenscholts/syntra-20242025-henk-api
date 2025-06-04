import { NextFunction, Request, Response, Router } from "express";
import { jwtMiddleware } from "../middleware/errorHandling.js";
import {
  createNewEventForGroup,
  deleteEventByIdForUser,
  getAllEventsForAUser,
  updateEventForGroup,
} from "../services/EventService.js";

export const initEventRoutes = (router: Router) => {
  /**
   * GET /events/personal
   * @security BearerAuth
   * @tags Events
   * @summary Get all events in my default group
   * @description Get all events in my default group
   * @param {string} from.query.optional - Start date filter
   * @param {string} to.query.optional - End date filter
   * @return {array<CreatedEvent>} 200 - Array of events
   */
  router.get("/events/personal", jwtMiddleware, getPersonalEvents);

  /**
   * GET /events
   * @security BearerAuth
   * @tags Events
   * @summary Get all events (you have access to)
   * @description Get all events that you have access to
   * @param {string} from.query.optional - Start date filter
   * @param {string} to.query.optional - End date filter
   * @param {string} groupId.query.optional - Group id filter
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

  /**
   * DELETE /events/{eventId}
   * @security BearerAuth
   * @tags Events
   * @summary Delete an event
   * @description Delete an event by its ID
   * @param {number} eventId.path.required - Event ID
   * @return {string} 200 - Event deleted
   */
  router.delete("/events/:eventId", jwtMiddleware, deleteEventById);

  /**
   * PUT /events/{eventId}
   * @security BearerAuth
   * @tags Events
   * @summary Update an event
   * @description Update an event by its ID
   * @param {number} eventId.path.required - Event ID
   * @param {UpdatedEvent} request.body.required - Event details
   * @return {Event} 200 - Updated event
   */
  router.put("/events/:eventId", jwtMiddleware, updateEventById);
};

const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    const from = req.query.from
      ? new Date(req.query.from as string)
      : undefined;
    const to = req.query.to ? new Date(req.query.to as string) : undefined;
    const groupId = req.query.groupId ? Number(req.query.groupId) : undefined;
    const events = await getAllEventsForAUser(
      Number(req.user.userId),
      from,
      to,
      groupId
    );
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
  const { groupId, start, end, title, description } = req.body;
  const eventToCreate = {
    start: new Date(start),
    end: new Date(end),
    title,
    description,
  };
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

const getPersonalEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    const from = req.query.from
      ? new Date(req.query.from as string)
      : undefined;
    const to = req.query.to ? new Date(req.query.to as string) : undefined;
    const events = await getAllEventsForAUser(
      Number(req.user.userId),
      from,
      to,
      undefined,
      true
    );
    res.status(200).json(events);
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

const deleteEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    const eventId = Number(req.params.eventId);
    await deleteEventByIdForUser(eventId, Number(req.user.userId));
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

const updateEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | undefined> => {
  try {
    const eventId = Number(req.params.eventId);
    const { start, end, title, description } = req.body;
    const eventToUpdate = {
      start: new Date(start),
      end: new Date(end),
      title,
      description,
    };
    const updatedEvent = await updateEventForGroup(
      eventId,
      Number(req.user.userId),
      eventToUpdate
    );
    res
      .status(200)
      .json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    console.error("error", error);
    next(error);
  }
};

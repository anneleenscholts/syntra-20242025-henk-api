import { Router } from "express";
import { initAuthRoutes } from "./authController.js";
import { initUserRoutes } from "./userController.js";
import { initGroupRoutes } from "./groupController.js";
import { initEventRoutes } from "./eventController.js";
import { initInvitationsRoutes } from "./invitationController.js";
import { initTaskRoutes } from "./taskController.js";

export const initRoutes = (router: Router) => {
  initAuthRoutes(router);
  initUserRoutes(router);
  initGroupRoutes(router);
  initEventRoutes(router);
  initInvitationsRoutes(router);
  initTaskRoutes(router);
};

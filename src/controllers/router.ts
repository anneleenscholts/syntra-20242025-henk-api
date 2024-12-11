import { Router } from "express";
import { initAuthRoutes } from "./authController.js"
import { initUserRoutes } from "./userController.js";

export const initRoutes = (router: Router) => {
    initAuthRoutes(router);
    initUserRoutes(router);
}
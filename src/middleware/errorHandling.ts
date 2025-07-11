import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../models/errors/BadRequestError.js";
import { NotFoundError } from "../models/errors/NotFoundError.js";
import jwt from "jsonwebtoken";

export const errorHandlingMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof NotFoundError) {
    res.status(err.statusCode).json({ error: err.message });
  }
  if (err instanceof BadRequestError) {
    res.status(err.statusCode).json({ error: err.message });
  }

  res.status(500).json({ error: err.message });
};

export const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Is there an Authorization header?
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  // Split off the "Bearer" part of the header
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err && err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};

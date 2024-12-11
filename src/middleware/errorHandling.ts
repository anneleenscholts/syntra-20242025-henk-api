import { Request, Response } from "express";
import { BadRequestError } from "../models/errors/BadRequestError.js";
import { NotFoundError } from "../models/errors/NotFoundError.js";
import jwt from "jsonwebtoken";

export const errorHandlingMiddleware = (err, req, res) => {
    if (err instanceof NotFoundError) {
        res.status(err.statusCode).json({ error: err.message });
    }
    if (err instanceof BadRequestError) {
        res.status(err.statusCode).json({ error: err.message });
    }

    // Handle other errors
    res.status(500).json({ error: "Internal Server Error" });
}

export const jwtMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        // Token is valid; you can pass user info to req.user if needed
        req.user = decoded;
        next();
    });
}
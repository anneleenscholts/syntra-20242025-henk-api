import { BadRequestError } from "../models/BadRequestError.js";
import { NotFoundError } from "../models/NotFoundError.js";

export const errorHandlingMiddleware = (err, req, res, next) => {
    if (err instanceof NotFoundError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    if (err instanceof BadRequestError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    // Handle other errors
    res.status(500).json({ error: "Internal Server Error" });
}
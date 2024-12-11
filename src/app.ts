import express from 'express';
import { Router } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { initDB } from './config/db.js';
import { initRoutes } from "./controllers/router.js";
import { errorHandlingMiddleware } from './middleware/errorHandling.js';

dotenv.config();

const app = express();
const router = Router();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
initRoutes(router);
app.use("/api", router);
app.use(errorHandlingMiddleware)

const connectionString = process.env.DB_CONNECTION_STRING || "";

initDB(connectionString)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

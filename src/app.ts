import express, { Router } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { initDB } from './db/db.js';
import { initRoutes } from "./controllers/router.js";
import { errorHandlingMiddleware } from './middleware/errorHandling.js';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import { swaggerOpts } from './config/swaggerOpts.js';


dotenv.config();

const app = express();
const router = Router();
const PORT = process.env.PORT || 3000;

// Swagger docs
expressJSDocSwagger(app)(swaggerOpts);

// Middleware
app.use(bodyParser.json());

// Routes
app.use(express.json());
initRoutes(router);
app.use("/api", router);
app.use(errorHandlingMiddleware)

const connectionString = process.env.DB_CONNECTION_STRING || "";

initDB(connectionString)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Swagger docs available at /api-docs");
});

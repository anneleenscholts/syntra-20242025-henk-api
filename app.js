const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const { sequelize } = require("./models/User");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);

// Connect to PostgreSQL
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Unable to connect to the database:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

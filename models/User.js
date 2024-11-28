const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();  // Load environment variables

const sequelize = new Sequelize({
  host: process.env.DB_HOST,        // 'localhost'
  dialect: "postgres",              // Use PostgreSQL dialect
  username: process.env.DB_USER,    // 'ascholts'
  password: process.env.DB_PASSWORD,// 'pw'
  database: process.env.DB_NAME,    // 'henk_api' (the actual database)
  logging: console.log,             // Optional: log SQL queries
});

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync()
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

module.exports = { sequelize, User };

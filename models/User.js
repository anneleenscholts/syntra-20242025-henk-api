const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();  // Load environment variables

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

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

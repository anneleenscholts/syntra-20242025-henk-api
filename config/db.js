import { Sequelize } from 'sequelize';
import { UserDefinition } from '../models/User.js';

// Connect to PostgreSQL
let User;
let db;

export const initDB = async (connectionString) => {
    db = new Sequelize(connectionString);
    await db.authenticate();
    initModels();
    db.sync();
}

const initModels = () => {
    User = db.define("User", UserDefinition);
}

export {
    User,
    db
}

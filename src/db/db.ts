import { Sequelize } from 'sequelize';
import { UserDefinition } from '../models/User.js';
import { GroupDefinition } from '../models/Group.js';

// Connect to PostgreSQL
let User;
let Group;
let db: Sequelize;

export const initDB = async (connectionString: string) => {
    db = new Sequelize(connectionString);
    await db.authenticate();
    initModels();
    db.sync();
}

const initModels = () => {
    User = db.define("User", UserDefinition);
    Group = db.define("Group", GroupDefinition);
    const UserGroup = db.define('UserGroup', {});

    User.belongsToMany(Group, { through: UserGroup });
    Group.belongsToMany(User, { through: UserGroup });
}

export {
    User,
    Group,
    db
}

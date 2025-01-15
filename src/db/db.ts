import { Sequelize } from 'sequelize';
import { UserDefinition } from '../models/User.js';
import { GroupDefinition } from '../models/Group.js';
import { EventDefinition } from '../models/Event.js';

// Connect to PostgreSQL
let User, Group, Event;
let db: Sequelize;

export const initDB = async (connectionString: string) => {
    db = new Sequelize(connectionString);
    await db.authenticate();
    initModels();
    db.sync({alter: true});
}

const initModels = () => {
    User = db.define("User", UserDefinition);
    Group = db.define("Group", GroupDefinition);
    Event = db.define("Event", EventDefinition)
    const UserGroup = db.define('UserGroup', {});

    Group.hasMany(Event, {foreignKey: "groupId"});
    Event.belongsTo(Group, { foreignKey: "groupId" });

    User.hasOne(Event, {foreignKey: "organizer"});

    User.belongsToMany(Group, { through: UserGroup });
    Group.belongsToMany(User, { through: UserGroup });
}

export {
    User,
    Group,
    Event,
    db
}

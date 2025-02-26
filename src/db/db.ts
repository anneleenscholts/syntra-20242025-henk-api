import { DataTypes, Sequelize } from "sequelize";
import { UserDefinition } from "../models/db/User.js";
import { GroupDefinition } from "../models/db/Group.js";
import { EventDefinition } from "../models/db/Event.js";
import { InvitationDefinition } from "../models/db/Invitation.js";
import { UserPreferencesDefinition } from "../models/db/UserPreferences.js";
import { up as changeEventDataTypes } from "../db/migrations/20250219201300-change-event-start-end-to-date.js";

// Connect to PostgreSQL
let User, Group, Event, Invitation, UserPreferences;
let db: Sequelize;

export const initDB = async (connectionString: string) => {
  db = new Sequelize(connectionString);
  await db.authenticate();
  await runMigrations();
  initModels();
  db.sync({ alter: true });
};

const initModels = () => {
  User = db.define("User", UserDefinition);
  Group = db.define("Group", GroupDefinition);
  Event = db.define("Event", EventDefinition);
  Invitation = db.define("Invitation", InvitationDefinition);
  UserPreferences = db.define("UserPreferences", UserPreferencesDefinition);

  const UserGroup = db.define("UserGroup", {});

  Group.hasMany(Event, { foreignKey: "groupId" });
  Event.belongsTo(Group, { foreignKey: "groupId" });
  User.hasOne(UserPreferences, { foreignKey: "userId" });
  UserPreferences.belongsTo(User, { foreignKey: "userId" });

  Invitation.belongsTo(User, { foreignKey: "invitedById", as: "invitedBy" });
  Invitation.belongsTo(User, { foreignKey: "inviteeId", as: "invitee" });
  Invitation.belongsTo(Group, { foreignKey: "invitedForId", as: "invitedFor" });

  User.hasOne(Event, { foreignKey: "organizer" });

  User.belongsToMany(Group, { through: UserGroup });
  Group.belongsToMany(User, { through: UserGroup });
};

const runMigrations = async () => {
  const queryInterface = db.getQueryInterface();

  // Create a table to track applied migrations if it doesn't exist
  await queryInterface.createTable("Migrations", {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    appliedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
  });

  // Check if the migration has already been applied
  const [results] = await queryInterface.sequelize.query(`
    SELECT name FROM "Migrations" WHERE name = '20250219201300-change-event-start-end-to-date'
  `);

  if (results.length === 0) {
    // Run the migration
    await changeEventDataTypes(queryInterface, DataTypes);

    // Record the migration as applied
    await queryInterface.bulkInsert("Migrations", [
      { name: "20250219201300-change-event-start-end-to-date" },
    ]);
  }
};

export { User, Group, Event, Invitation, UserPreferences, db };

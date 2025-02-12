import { Sequelize } from "sequelize";
import { UserDefinition } from "../models/db/User.js";
import { GroupDefinition } from "../models/db/Group.js";
import { EventDefinition } from "../models/db/Event.js";
import { InvitationDefinition } from "../models/db/Invitation.js";

// Connect to PostgreSQL
let User, Group, Event, Invitation;
let db: Sequelize;

export const initDB = async (connectionString: string) => {
  db = new Sequelize(connectionString);
  await db.authenticate();
  initModels();
  db.sync({ alter: true });
};

const initModels = () => {
  User = db.define("User", UserDefinition);
  Group = db.define("Group", GroupDefinition);
  Event = db.define("Event", EventDefinition);
  Invitation = db.define("Invitation", InvitationDefinition);

  const UserGroup = db.define("UserGroup", {});

  Group.hasMany(Event, { foreignKey: "groupId" });
  Event.belongsTo(Group, { foreignKey: "groupId" });

  Invitation.belongsTo(User, { foreignKey: "invitedBy" });
  Invitation.belongsTo(User, { foreignKey: "invitee" });
  Invitation.belongsTo(Group, { foreignKey: "invitedFor" });

  User.hasOne(Event, { foreignKey: "organizer" });

  User.belongsToMany(Group, { through: UserGroup });
  Group.belongsToMany(User, { through: UserGroup });
};

export { User, Group, Event, Invitation, db };

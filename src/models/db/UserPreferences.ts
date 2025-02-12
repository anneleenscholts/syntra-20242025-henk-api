import { DataTypes } from "sequelize";

export const UserPreferencesDefinition = {
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Hasselt",
  },
  app: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "calendar",
  },
  theme: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "dark",
  },
};

export interface IUserPreferences {
  theme: string;
  city: string;
  app: string;
}

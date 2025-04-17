import { DataTypes } from "sequelize";

export const GroupDefinition = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
};

export interface IGroup {
  name: string;
  image?: string;
}

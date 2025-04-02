import { DataTypes } from "sequelize";

export const TaskDefinition = {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
    unique: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
};

export interface ITask {
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
}

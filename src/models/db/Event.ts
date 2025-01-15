import { DataTypes } from 'sequelize';

export const EventDefinition = {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  start: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  end: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
}

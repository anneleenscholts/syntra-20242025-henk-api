import { DataTypes } from 'sequelize';

export const UserDefinition = {
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
  }
}

export interface IUser {
    username: string,
    email: string,
    password: string
}

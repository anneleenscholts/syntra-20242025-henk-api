import { DataTypes } from 'sequelize';

export const UserDefinition = {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  defaultLanguage: {
    type: DataTypes.STRING,
    defaultValue: "en"
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

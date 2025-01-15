import { DataTypes } from 'sequelize';

export const GroupDefinition = {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    }
}

export interface IGroup {
    name: string
}
import * as s from "sequelize"
import db from "../repository"

export const User = db.define(
    'User',
    {
        // Model attributes are defined here
        id: {
            type: s.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: s.DataTypes.STRING,
        },
        lastName: {
            type: s.DataTypes.STRING,
        },
        email: {
            type: s.DataTypes.STRING,
            allowNull: true 
        },
        salt: {
            type: s.DataTypes.STRING,
        },
    },
)


export const Admin = db.define(
    'Admin',
    {
        // Model attributes are defined here
        id: {
            type: s.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: s.DataTypes.INTEGER,
        },
    },
)


export const Donater = db.define(
    'Donater',
    {
        // Model attributes are defined here
        id: {
            type: s.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: s.DataTypes.INTEGER,
        },
        money: {
            type: s.DataTypes.INTEGER,
        },
    },
)

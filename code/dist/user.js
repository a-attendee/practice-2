"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Donater = exports.Admin = exports.User = void 0;
const s = require("sequelize");
const repository_1 = require("./repository");
exports.User = repository_1.default.define('User', {
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
});
exports.Admin = repository_1.default.define('Admin', {
    // Model attributes are defined here
    id: {
        type: s.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: s.DataTypes.INTEGER,
    },
});
exports.Donater = repository_1.default.define('Donater', {
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
});

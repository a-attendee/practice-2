"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Donater = exports.Admin = exports.User = void 0;
const repository_1 = __importDefault(require("../repository"));
const s = __importStar(require("sequelize"));
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

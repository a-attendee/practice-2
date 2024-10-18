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
exports.Project = exports.Organization = void 0;
const s = __importStar(require("sequelize"));
const repository_1 = __importDefault(require("repository"));
exports.Organization = repository_1.default.define('Organization', {
    // Model attributes are defined here
    id: {
        type: s.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: s.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: s.DataTypes.STRING,
        allowNull: true,
    },
});
exports.Project = repository_1.default.define('Project', {
    // Model attributes are defined here
    id: {
        type: s.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: s.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: s.DataTypes.STRING,
        allowNull: true,
    },
    expectedMoneyRise: {
        type: s.DataTypes.INTEGER,
        allowNull: true,
    },
    actualMoneyRise: {
        type: s.DataTypes.INTEGER,
        allowNull: false,
    },
    startDate: {
        type: s.DataTypes.TIME,
        allowNull: false,
    },
    endDate: {
        type: s.DataTypes.TIME,
        allowNull: true,
    },
    status: {
        type: s.DataTypes.ENUM,
        values: ['active', 'pending', 'inactive'],
        allowNull: false
    }
});

import * as s from "sequelize"
import db from "../repository"

export const Organization = db.define(
  'Organization',
  {
    // Model attributes are defined here
    id: {
      type: s.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
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
  },
)
export const Project = db.define(
  'Project',
  {
    // Model attributes are defined here
    id: {
      type: s.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
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
        values:  ['active', 'pending', 'inactive'],
        allowNull: false
    }
  },
)

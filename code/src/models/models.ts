// This file contains all models with relationships //
// for sequelize first section of file defines user //

import * as s from "sequelize"
import { DataTypes, Model, Optional  } from 'sequelize';
import db from "../repository"

interface UserAttributes {
  id: number;
  firstName: string
  lastName: string
  email: string
  salt: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}




// Basic user //
export const User = db.define<Model<any, UserCreationAttributes>>(
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
    }
  } 
)

// Admin is a role for user //
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
  }
)

// Donater is a role for user //
export const Donater = db.define(
  'Donater',
  {

    // Model attributes are defined here
    id: {
      type: s.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    money: {
      type: s.DataTypes.INTEGER,
    },
  }
)

// This section defines models related to donation projects //
//
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
  }
)

export const Project = db.define(
  'Project',
  {

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
      allowNull: false,
    },
    actualMoneyRise: {
      type: s.DataTypes.INTEGER,
      allowNull: false,
    },    
    startDate: {
      type: s.DataTypes.STRING,
      allowNull: false,
    },
    endDate: {
      type: s.DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: s.DataTypes.STRING,
      allowNull: true
    }
  }
)

// This model is user as join table and history for donates //
export const HistoryDonations = db.define(
  "HistoryDonations", 
  
  {
    id: {
      type: s.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    moneyDonated: {
      type: s.DataTypes.NUMBER,
      allowNull: false
    },
  }
)
// This is a join table for project and organization //
export const ProjectOrganization = db.define(
  "ProjectOrganization",
  {
    id: {
      type: s.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  },
)

// This is a join table for admin and project models //
export const AdminProject = db.define(
  "AdminProject",
  {}
)

// This is a join table for admin and organization //
export const AdminOrganization = db.define(
  "AdminOrganization",
  {}
)

// Associations //

// User roles //
// Relation: has one
// Admin.belongsTo(User)

User.hasOne(Donater)
Donater.belongsTo(User)

// Project admins //
// Relation: many to many //
Admin.belongsToMany(Project, {through: "AdminProjects"})
Project.belongsToMany(Admin, {through: "AdminProjects"})

// Admin organizations //
// Relation: many to many //
Admin.belongsToMany(Organization, {through: "AdminOrganizations"})
Organization.belongsToMany(Admin, {through: "AdminOrganizations"})

// User donations //
// Relation: many to many //
Donater.belongsToMany(Project, {
  through: {
    model: HistoryDonations, 
    unique: false
}})

Project.belongsToMany(Donater, {
  through: {
    model: HistoryDonations, 
    unique: false
}})

// Organization projects //
// Relation: many to many //
Project.belongsToMany(Organization, {
  through: {
    model: ProjectOrganization, 
    unique: false
}})

Organization.belongsToMany(Project, {through: {
    model: ProjectOrganization,
    unique: false
}})



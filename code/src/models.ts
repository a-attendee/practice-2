// This file contains all models with relationships //
// for sequelize first section of file defines user //

import * as s from "sequelize"
import db from "./repository"

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
    },
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
        user_id: {
            type: s.DataTypes.INTEGER,
        },
        money: {
            type: s.DataTypes.INTEGER,
        },
    },
)

// This section defines models related to donation projects //

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

// This model is user as join table and history for donates //
export const HistoryDonations = db.define(
  "HistoryDonations",
  {
    id: {
      type: s.DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    donaterId: {
      type: s.DataTypes.INTEGER,
      references: {
        model: Donater, 
        key: 'id',
      },
    },
    projectId: {
      type: s.DataTypes.INTEGER,
      references: {
        model: Project,
        key: 'id',
      },
    },
    moneyDonated: {
      type: s.DataTypes.NUMBER,
      allowNull: false
    }
  }
)

// This is a join table for project and organization //
export const ProjectOrganization = db.define(
  "ProjectOrganization",
  {
    id: {
      type: s.DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    projectId: {
      type: s.DataTypes.INTEGER,
      references: {
        model: Project,
        key: 'id',
      },
    },
    organizationId: {
      type: s.DataTypes.INTEGER,
      references: {
        model: Organization, 
        key: 'id',
      },
    },
    moneyDonated: {
      type: s.DataTypes.NUMBER,
      allowNull: false
    }
  }
)

// This is a join table for admin and project models //
export const AdminProject = db.define(
  "AdminProject",
  {
    id: {
      type: s.DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    adminId: {
      type: s.DataTypes.INTEGER,
      references: {
        model: Admin,
        key: 'id',
      },
    },
    projectId: {
      type: s.DataTypes.INTEGER,
      references: {
        model: Project, 
        key: 'id',
      },
    },
    moneyDonated: {
      type: s.DataTypes.NUMBER,
      allowNull: false
    }
  }
)

// This is a join table for admin and organization //
export const AdminOrganization = db.define(
  "AdminOrganization",
  {
    id: {
      type: s.DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    adminId: {
      type: s.DataTypes.INTEGER,
      references: {
        model: Admin,
        key: 'id',
      },
    },
    organizationId: {
      type: s.DataTypes.INTEGER,
      references: {
        model: Organization, 
        key: 'id',
      },
    },
    moneyDonated: {
      type: s.DataTypes.NUMBER,
      allowNull: false
    }
  }
)

// Associations //

// User roles //
// Relation: has one
Admin.belongsTo(User)
Donater.belongsTo(User)

// Project admins //
// Relation: many to many //
Admin.belongsToMany(Project, {through: AdminProject})
Project.belongsToMany(Admin, {through: AdminProject})

// Admin organizations //
// Relation: many to many //
Admin.belongsToMany(Organization, {through: AdminOrganization})
Organization.belongsToMany(Admin, {through: AdminOrganization})

// User donations //
// Relation: many to many //
Donater.belongsToMany(Project, {through: HistoryDonations})
Project.belongsToMany(Donater, {through: HistoryDonations})

// Organization projects //
// Relation: many to many //
Project.belongsToMany(Organization, {through: ProjectOrganization})
Organization.belongsToMany(Project, {through: ProjectOrganization})



import { Sequelize } from "sequelize"

const sequelize = new Sequelize({
  dialect: 'sqlite',
  port: 5432,
  storage: './api.sqlite'
});

export default sequelize

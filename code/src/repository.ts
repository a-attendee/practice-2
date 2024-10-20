import { Sequelize } from "sequelize"
// const sequelize = new Sequelize('sqlite::memory:') //

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './api.sqlite'
});

export default sequelize

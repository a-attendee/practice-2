import { Sequelize } from "sequelize"
const sequelize = new Sequelize('sqlite::memory:')

/*
const sequelize = new Sequelize({
  dialect: 'sqlite',
  port: 5432,
  host: 'localhost',
  username: 'alex',
  password: '1234',
  storage: './api.sqlite'
});
*/

export default sequelize

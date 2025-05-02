const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

const sequelize = new Sequelize(
 process.env.DATABASE_URL || 'postgresql://postgres:postgres@db:5432/crud_app',
 {
  dialect: 'postgres',
  pool: {
   max: 5,
   min: 0,
   acquire: 30000,
   idle: 10000,
  },
 }
)

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize
db.User = require('./user.model')(sequelize, Sequelize)

module.exports = db

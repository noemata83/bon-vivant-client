"use strict"

const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")
const { Op } = Sequelize
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || "development"
const config = require(__dirname + "/../config/config.json")[env]
const db = {}
import dotenv from "dotenv"
dotenv.config()

const operatorsAliases = {
  eq: Op.eq,
  ne: Op.ne,
  gte: Op.gte,
  gt: Op.gt,
  lte: Op.lte,
  lt: Op.lt,
  like: Op.like,
  contains: Op.contains,
  notLike: Op.notLike,
}

const sequelize = new Sequelize(
  process.env.PSQL_DATABASE,
  process.env.PSQL_USERNAME,
  process.env.PSQL_PASSWORD,
  {
    host: "localhost",
    port: 54320,
    dialect: "postgres",
    logging: false,
    operatorsAliases,
  }
)

fs.readdirSync(process.cwd() + "/src/api/models/")
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
  })
  .forEach((file) => {
    const model = require("./" + file)(sequelize, Sequelize)
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db

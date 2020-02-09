import Sequelize, { Op } from "sequelize"
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
  notLike: Op.notLike
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
    operatorsAliases
  }
)

export default sequelize

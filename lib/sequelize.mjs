import Sequelize from "sequelize"
import dotenv from "dotenv"
dotenv.config()
console.log(process.env.PSQL_USERNAME)
const sequelize = new Sequelize(
  process.env.PSQL_DATABASE,
  process.env.PSQL_USERNAME,
  process.env.PSQL_PASSWORD,
  {
    host: "localhost",
    port: 54320,
    dialect: "postgres",
    logging: false
  }
)

export default sequelize

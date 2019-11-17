import Sequelize from "sequelize"

const sequelize = new Sequelize(
  process.env.PSQL_DATABASE,
  process.env.PSQL_USERNAME,
  process.env.PSQL_PASSWORD,
  {
    host: "localhost",
    port: 54320,
    dialect: "postgres"
  }
)

export default sequelize

import { sequelize } from "./models"

const connection: any = {}

export const syncDB = (handler) => async (req, res) => {
  if (connection.isConnected) {
    return handler(req, res)
  }
  await sequelize.sync()
  await sequelize.authenticate()
  connection.isConnected = true
  console.log("=> Created a new database connection.")
  return handler(req, res)
}

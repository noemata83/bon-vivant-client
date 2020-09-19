import models from "./models"

const connection = {}

export const syncDB = (handler) => async (req, res) => {
  if (connection.isConnected) {
    return handler(req, res)
  }
  await models.sequelize.sync()
  await models.sequelize.authenticate()
  connection.isConnected = true
  console.log("=> Created a new database connection.")
  return handler(req, res)
}

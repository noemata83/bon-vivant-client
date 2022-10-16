import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { sequelize } from "./models"

const connection: any = {}

export const syncDB =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (connection.isConnected) {
      return handler(req, res)
    }
    await sequelize.sync()
    await sequelize.authenticate()
    connection.isConnected = true
    console.info("=> Created a new database connection.")
    return handler(req, res)
  }

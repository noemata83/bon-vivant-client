import sequelize from "../../lib/sequelize"
// import { initIngredient } from "./Ingredients/Ingredient"
// import { initSpecs } from "./Specs/Spec"
// import { initUser } from "./Users/User"
// import { initFamilies } from "./Ingredients/IngredientFamily"
// import { initReview } from "./Specs/Review"
// import createAssociations from "./associations"
import models from "./models"

const connection = {}

export const syncDB = handler => async (req, res) => {
  if (connection.isConnected) {
    return handler(req, res)
  }
  await models.sequelize.sync()
  await models.sequelize.authenticate()
  connection.isConnected = true
  console.log("=> Created a new database connection.")
  return handler(req, res)
}

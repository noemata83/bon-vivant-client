import sequelize from "../../lib/sequelize"
import { initIngredient } from "./Ingredients/Ingredient"
import { initSpecs } from "./Specs/Spec"
import { initUser } from "./Users/User"
import { initFamilies } from "./Ingredients/IngredientFamily"
import { initReview } from "./Specs/Review"
import createAssociations from "./associations"

const connection = {}

export const syncDB = handler => async (req, res) => {
  if (connection.isConnected) {
    console.log("=> Using an existing connection.")
    return handler(req, res)
  }
  initIngredient()
  initFamilies()
  initSpecs()
  initUser()
  initReview()
  createAssociations()
  await sequelize.sync()
  await sequelize.authenticate()
  connection.isConnected = true
  console.log("=> Created a new database connection.")
  return handler(req, res)
}

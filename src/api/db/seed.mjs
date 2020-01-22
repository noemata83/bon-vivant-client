import dotenv from "dotenv"
dotenv.config()
import sequelize from "../../../lib/sequelize.mjs"
import { initIngredient } from "../Ingredients/Ingredient.mjs"
import { initSpecs } from "../Specs/Spec.mjs"
import { initUser } from "../Users/User.mjs"
import { initFamilies } from "../Ingredients/IngredientFamily.mjs"
import { initReview } from "../Specs/Review.mjs"
import createAssociations from "../associations.mjs"
import seedIngredientFamilies from "./seedIngredientFamilies.mjs"
import seedIngredients from "./seedIngredients.mjs"
import seedSpecs from "./seedSpecs.mjs"

async function seedDB() {
  initIngredient()
  initFamilies()
  initSpecs()
  initUser()
  initReview()
  createAssociations()
  await sequelize.sync({ force: true })
  await sequelize.authenticate()
  await seedIngredientFamilies()
  await seedIngredients()
  await seedSpecs()
}

seedDB()

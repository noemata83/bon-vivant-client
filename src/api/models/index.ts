"use strict"

import { Sequelize } from "sequelize-typescript"
const env = process.env.NODE_ENV || "development"
import dotenv from "dotenv"
import { Op } from "sequelize"
import { Ingredient } from "./ingredient.model"
import { IngredientFamily } from "./ingredientfamily.model"
import { Review } from "./review.model"
import { Spec } from "./spec.model"
import { SpecIngredient } from "./specingredient.model"
import { User } from "./user.model"
import { IngredientAndFamily } from "./ingredientAndFamily.model"
import { IngredientShelf } from "./ingredientShelf.model"
import { IngredientSubstitionClass } from "./ingredientSubstitutionClass.model"
import { CocktailBook } from "./cocktailBook.model"
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

console.log("directory: ", process.cwd() + "/src/api/models/*.model.ts")

export const sequelize = new Sequelize({
  database: process.env.PSQL_DATABASE,
  username: process.env.PSQL_USERNAME,
  password: process.env.PSQL_PASSWORD,
  dialect: "postgres",
  host: "localhost",
  port: 54320,
  logging: console.log,
  operatorsAliases,
  models: [
    Ingredient,
    IngredientFamily,
    Review,
    Spec,
    SpecIngredient,
    User,
    IngredientAndFamily,
    IngredientShelf,
    IngredientSubstitionClass,
    CocktailBook,
  ],
})

export { Ingredient } from "./ingredient.model"
export { IngredientFamily } from "./ingredientfamily.model"
export { Review } from "./review.model"
export { Spec } from "./spec.model"
export { SpecIngredient } from "./specingredient.model"
export { User } from "./user.model"

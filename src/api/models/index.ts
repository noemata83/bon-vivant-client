"use strict"

import { Sequelize } from "sequelize-typescript"
const env = process.env.NODE_ENV || "development"
import dotenv from "dotenv"
import { Op } from "sequelize"
import { Ingredient } from "./ingredient.model"
import { Review } from "./review.model"
import { Spec } from "./spec.model"
import { SpecIngredient } from "./specingredient.model"
import { User } from "./user.model"
import { IngredientShelf } from "./ingredientShelf.model"
import { CocktailBook } from "./cocktailBook.model"
import { Glassware } from "./glasssware.model"
import { UserRole } from "./userRole.model"
import { Permission } from "./permission.model"
import { UserRolePermission } from "./userRolePermission.model"
dotenv.config()

export const sequelize = new Sequelize({
  database: process.env.PSQL_DATABASE,
  username: process.env.PSQL_USERNAME,
  password: process.env.PSQL_PASSWORD,
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  logging: (sql, queryObject: any) => {
    queryObject.where ? console.info(queryObject.where) : queryObject
  },
  models: [
    Ingredient,
    Review,
    Spec,
    SpecIngredient,
    User,
    IngredientShelf,
    CocktailBook,
    Glassware,
    UserRole,
    Permission,
    UserRolePermission,
  ],
})

export { Ingredient } from "./ingredient.model"
export { Review } from "./review.model"
export { Spec } from "./spec.model"
export { SpecIngredient } from "./specingredient.model"
export { User } from "./user.model"

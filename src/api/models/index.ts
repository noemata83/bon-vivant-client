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

const operatorsAliases = {
  eq: Op.eq,
  ne: Op.ne,
  gte: Op.gte,
  gt: Op.gt,
  lte: Op.lte,
  lt: Op.lt,
  in: Op.in,
  notIn: Op.notIn,
  like: Op.like,
  contains: Op.contains,
  notLike: Op.notLike,
  or: Op.or,
  and: Op.and,
}

export const sequelize = new Sequelize({
  database: process.env.PSQL_DATABASE,
  username: process.env.PSQL_USERNAME,
  password: process.env.PSQL_PASSWORD,
  dialect: "postgres",
  host: "localhost",
  port: 54320,
  logging: (sql, queryObject: any) => {
    queryObject.where ? console.log(queryObject.where) : queryObject
  },
  operatorsAliases,
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

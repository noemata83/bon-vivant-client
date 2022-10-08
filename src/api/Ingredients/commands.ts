import { Repository } from "sequelize-typescript"
import { Ingredient } from "../models"
import { AuthenticatedUser } from "../Users/authorization/authorization"

export interface CreateIngredientCommand {
  ingredient: any
  user: AuthenticatedUser
  ingredientRepository: Repository<Ingredient>
}

export interface EditIngredientCommand {
  id: string
  update: any
  user: AuthenticatedUser
  ingredientRepository: Repository<Ingredient>
}

export interface DeleteIngredientCommand {
  id: string
  user: AuthenticatedUser
  ingredientRepository: Repository<Ingredient>
}

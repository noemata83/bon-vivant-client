import { Repository } from "sequelize-typescript"
import { Ingredient, Review, Spec, SpecIngredient, User } from "../models"
import { AuthenticatedUser } from "../Users/authorization/authorization"

export interface CreateSpecCommand {
  spec: any
  user: AuthenticatedUser
  userRepository: Repository<User>
  specRepository: Repository<Spec>
  specIngredientRepository: Repository<SpecIngredient>
  ingredientRepository: Repository<Ingredient>
}

export interface EditSpecCommand {
  id: string
  updates: any
  user: AuthenticatedUser
  userRepository: Repository<User>
  specRepository: Repository<Spec>
  specIngredientRepository: Repository<SpecIngredient>
  ingredientRepository: Repository<Ingredient>
  reviewRepository: Repository<Review>
}

export interface DeleteSpecCommand {
  id: string
  user: AuthenticatedUser
  specRepository: Repository<Spec>
}

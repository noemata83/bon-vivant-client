import { AuthenticatedUser } from "../Users/authorization/authorization"

export interface CreateIngredientCommand {
  ingredient: any
  user: AuthenticatedUser
}

export interface EditIngredientCommand {
  id: string
  update: any
  user: AuthenticatedUser
}

export interface DeleteIngredientCommand {
  id: string
  user: AuthenticatedUser
}

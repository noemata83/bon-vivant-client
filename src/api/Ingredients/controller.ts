import { ForbiddenError } from "apollo-server-core"
import { Ingredient } from "../models"
import { hasPermission } from "../Users/authorization/authorization"
import { PermissionType } from "../Users/authorization/permission.enum"
import {
  CreateIngredientCommand,
  DeleteIngredientCommand,
  EditIngredientCommand,
} from "./commands"

export const createIngredient = async (command: CreateIngredientCommand) => {
  const { user, ingredient } = command
  if (!hasPermission(user, PermissionType.CreateIngredient)) {
    throw new ForbiddenError(
      "You do not have permission to create ingredients."
    )
  }
  const newIngredient = await Ingredient.create(ingredient)
  const createdIngredient = Ingredient.findOne({
    where: { id: newIngredient.id },
    include: [Ingredient],
  })
  return createdIngredient
}

export const editIngredient = async (command: EditIngredientCommand) => {
  const { id, user, update } = command
  if (!hasPermission(user, PermissionType.EditIngredient)) {
    throw new ForbiddenError(
      "You do not have permission to modify ingredients."
    )
  }
  const { ingredient } = update
  await Ingredient.update(ingredient, {
    where: { id: { eq: id } },
  })
  return (await Ingredient.findByPk(id, { include: [Ingredient] }))?.toJSON()
}

export const deleteIngredient = async (command: DeleteIngredientCommand) => {
  const { id, user } = command
  if (!hasPermission(user, PermissionType.DeleteIngredient)) {
    throw new ForbiddenError(
      "You do not have permission to delete ingredients."
    )
  }
  const ingredientToDelete = await Ingredient.destroy({ where: { id } })
  return ingredientToDelete
}

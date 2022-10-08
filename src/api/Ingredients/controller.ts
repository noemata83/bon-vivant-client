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
  const { user, ingredient, ingredientRepository } = command
  if (!hasPermission(user, PermissionType.CreateIngredient)) {
    throw new ForbiddenError(
      "You do not have permission to create ingredients."
    )
  }
  const newIngredient = await ingredientRepository.create(ingredient)
  const createdIngredient = ingredientRepository.findOne({
    where: { id: newIngredient.id },
    include: [ingredientRepository],
  })
  return createdIngredient
}

export const editIngredient = async (command: EditIngredientCommand) => {
  const { id, user, update, ingredientRepository } = command
  if (!hasPermission(user, PermissionType.EditIngredient)) {
    throw new ForbiddenError(
      "You do not have permission to modify ingredients."
    )
  }
  const { ingredient } = update
  await ingredientRepository.update(ingredient, {
    where: { id: { eq: id } },
  })
  return (
    await ingredientRepository.findByPk(id, { include: [ingredientRepository] })
  ).toJSON()
}

export const deleteIngredient = async (command: DeleteIngredientCommand) => {
  const { id, user, ingredientRepository } = command
  if (!hasPermission(user, PermissionType.DeleteIngredient)) {
    throw new ForbiddenError(
      "You do not have permission to delete ingredients."
    )
  }
  const ingredientToDelete = await Ingredient.destroy({ where: { id } })
  return ingredientToDelete
}

import { ForbiddenError } from "apollo-server-core"
import { Op } from "sequelize"
import { Spec, Ingredient, SpecIngredient, User, Review } from "../models"
import { hasPermission } from "../Users/authorization/authorization"
import { PermissionType } from "../Users/authorization/permission.enum"
import {
  CreateSpecCommand,
  DeleteSpecCommand,
  EditSpecCommand,
} from "./commands"

const formatSpecIngredients = (ingredient: any): SpecIngredient => {
  return SpecIngredient.build({
    quantity: ingredient.specIngredients?.quantity,
    measure: ingredient.specIngredients?.measure,
    canSub: ingredient.specIngredients?.canSub,
    subWith: ingredient.specIngredients?.subWith,
    ingredientId: ingredient.id,
  })
}

export const formatSpec = (spec): Spec => {
  return Spec.build({
    name: spec.name,
    slug: spec.slug,
    description: spec.description,
    directions: spec.directions,
    source: spec.source,
    id: spec.id,
    contributedBy: spec.contributedBy,
    riffOn: spec.riffOn,
    reviews: spec.reviews,
    ingredients: spec.ingredients.map(formatSpecIngredients),
  })
}

export const createSpec = async (command: CreateSpecCommand) => {
  const { spec, user } = command
  if (!user || !hasPermission(user, PermissionType.CreateSpec)) {
    throw new ForbiddenError(
      "You do not have permission to create a new cocktail spec."
    )
  }
  const ingredients = spec.ingredients
  const newSpec = await Spec.create({
    ...spec,
    riffOnId: spec.riffOn,
    contributedById: user.id,
  })
  ingredients.forEach(async (ingredient) => {
    const foundIngredient = await Ingredient.findOne({
      where: {
        name: {
          [Op.eq]: ingredient.name,
        },
      },
    })
    delete ingredient.name
    try {
      await SpecIngredient.create({
        specId: newSpec.id,
        ingredientId: foundIngredient.id,
        ...ingredient,
      })
    } catch (err) {
      console.error(err)
    }
  })
  return Spec.findOne({
    where: { id: newSpec.id },
    include: [
      SpecIngredient,
      {
        model: User,
        as: "contributedBy",
      },
    ],
  })
}

export const editSpec = async (command: EditSpecCommand) => {
  const { user, updates, id } = command
  if (!user || !hasPermission(user, PermissionType.EditSpec)) {
    throw new ForbiddenError(
      "You do not have permission to edit a cocktail spec."
    )
  }
  const specToUpdate = await Spec.findByPk(id, {
    include: [SpecIngredient],
  })
  const ingredients = specToUpdate.ingredients
  await ingredients.forEach(async (ingredient) => {
    await ingredient.destroy()
  })
  const { spec } = updates
  spec.ingredients.forEach(async (ingredient) => {
    const foundIngredient = await Ingredient.findOne({
      where: { name: ingredient.name },
    })
    delete ingredient.name
    try {
      await SpecIngredient.create({
        specId: specToUpdate.id,
        ingredientId: foundIngredient.id,
        ...ingredient,
      })
    } catch (err) {
      console.error(err)
    }
  })
  await Spec.update(
    {
      ...spec,
    },
    { where: { id } }
  )
  const theSpec = await Spec.findOne({
    where: { id },
    include: [
      SpecIngredient,
      {
        model: User,
        as: "contributedBy",
      },
      {
        model: Review,
        as: "reviews",
        include: [User],
      },
    ],
  })
  const formattedFoundSpec = formatSpec(theSpec)
  return formattedFoundSpec
}

export const deleteSpec = async (command: DeleteSpecCommand) => {
  const { id, user } = command
  if (!user || !hasPermission(user, PermissionType.EditSpec)) {
    throw new ForbiddenError(
      "You do not have permission to edit a cocktail spec."
    )
  }
  const SpecToDelete = await Spec.findByPk(id)
  try {
    await Spec.destroy({ where: { id } })
    return SpecToDelete
  } catch (err) {
    throw Error("Could not delete that spec.")
  }
}

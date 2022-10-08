import { ForbiddenError } from "apollo-server-core"
import { Op } from "sequelize"
import { Spec, Ingredient, SpecIngredient, User, Review } from "../models"
import {
  AuthenticatedUser,
  hasPermission,
} from "../Users/authorization/authorization"
import { PermissionType } from "../Users/authorization/permission.enum"
import {
  CreateSpecCommand,
  DeleteSpecCommand,
  EditSpecCommand,
} from "./commands"

const formatSpecIngredients = (ingredient): SpecIngredient => {
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
  const {
    spec,
    user,
    specRepository,
    userRepository,
    specIngredientRepository,
    ingredientRepository,
  } = command
  if (!user || !hasPermission(user, PermissionType.CreateSpec)) {
    throw new ForbiddenError(
      "You do not have permission to create a new cocktail spec."
    )
  }
  const ingredients = spec.ingredients
  const newSpec = await specRepository.create({
    ...spec,
    riffOnId: spec.riffOn,
    contributedById: user.id,
  })
  ingredients.forEach(async (ingredient) => {
    const foundIngredient = await ingredientRepository.findOne({
      where: {
        name: {
          [Op.eq]: ingredient.name,
        },
      },
    })
    delete ingredient.name
    try {
      await specIngredientRepository.create({
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
      specIngredientRepository,
      {
        model: userRepository,
        as: "contributedBy",
      },
    ],
  })
}

export const editSpec = async (command: EditSpecCommand) => {
  const {
    user,
    updates,
    id,
    ingredientRepository,
    specIngredientRepository,
    specRepository,
    userRepository,
    reviewRepository,
  } = command
  if (!user || !hasPermission(user, PermissionType.EditSpec)) {
    throw new ForbiddenError(
      "You do not have permission to edit a cocktail spec."
    )
  }
  const specToUpdate = await specRepository.findByPk(id, {
    include: [specIngredientRepository],
  })
  const ingredients = specToUpdate.ingredients
  await ingredients.forEach(async (ingredient) => {
    await ingredient.destroy()
  })
  const { spec } = updates
  spec.ingredients.forEach(async (ingredient) => {
    const foundIngredient = await ingredientRepository.findOne({
      where: { name: ingredient.name },
    })
    delete ingredient.name
    try {
      await specIngredientRepository.create({
        specId: specToUpdate.id,
        ingredientId: foundIngredient.id,
        ...ingredient,
      })
    } catch (err) {
      console.error(err)
    }
  })
  await specRepository.update(
    {
      ...spec,
    },
    { where: { id } }
  )
  const theSpec = await specRepository.findOne({
    where: { id },
    include: [
      specIngredientRepository,
      {
        model: userRepository,
        as: "contributedBy",
      },
      {
        model: reviewRepository,
        as: "reviews",
        include: [User],
      },
    ],
  })
  const formattedFoundSpec = formatSpec(theSpec)
  return formattedFoundSpec
}

export const deleteSpec = async (command: DeleteSpecCommand) => {
  const { id, user, specRepository } = command
  if (!user || !hasPermission(user, PermissionType.EditSpec)) {
    throw new ForbiddenError(
      "You do not have permission to edit a cocktail spec."
    )
  }
  const SpecToDelete = await specRepository.findByPk(id)
  try {
    await Spec.destroy({ where: { id } })
    return SpecToDelete
  } catch (err) {
    throw Error("Could not delete that spec.")
  }
}

const formatFilter = (rawFilter) => {
  const filter: any = {}
  if (!rawFilter) {
    return
  }
  if (rawFilter.name) {
    filter.name = rawFilter.name
  }
  if (rawFilter.ingredients && rawFilter.ingredients.name) {
    filter["$ingredients.name$"] = rawFilter.ingredients.name
  }
  if (rawFilter.ingredients && rawFilter.ingredients.family) {
    filter["$ingredients.family.name$"] = rawFilter.ingredients.family
  }
  return filter
}

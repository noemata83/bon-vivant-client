const models = require("../models")
const { Spec, Ingredient, IngredientFamily, SpecIngredient, User } = models
// import Spec from "./Spec.mjs"
// import Ingredient from "../Ingredients/Ingredient.mjs"
// import IngredientFamily from "../Ingredients/IngredientFamily.mjs"
// import { SpecIngredient } from "../Ingredients/Ingredient.mjs"

const formatSpecIngredients = ingredient => ({
  quantity: ingredient.specIngredients.quantity,
  measure: ingredient.specIngredients.measure,
  canSub: ingredient.specIngredients.canSub,
  subWith: ingredient.specIngredients.subWith,
  ingredient: {
    id: ingredient.id,
    name: ingredient.name,
    slug: ingredient.slug,
    description: ingredient.description,
    createdAt: ingredient.createdAt,
    updatedAt: ingredient.updatedAt
  }
})

export const formatSpec = spec => ({
  name: spec.name,
  slug: spec.slug,
  description: spec.description,
  directions: spec.directions,
  author: spec.author,
  source: spec.source,
  id: spec.id,
  contributedBy: spec.contributedBy,
  riffOn: spec.riffOn,
  ingredients: spec.ingredients.map(formatSpecIngredients)
})

export const fetchAllSpecs = async (filter, limit) => {
  const recordFilter = formatFilter(filter)
  const specs = await Spec.findAll({
    where: recordFilter,
    limit,
    include: [
      {
        model: Ingredient,
        as: "ingredients",
        through: {
          model: SpecIngredient,
          as: "specIngredients"
        },
        include: [
          {
            model: IngredientFamily,
            as: "family",
            through: "IngredientsAndFamilies"
          }
        ]
      },
      {
        model: Spec,
        as: "riffOn"
      },
      {
        model: User,
        as: "contributedBy"
      }
    ]
  })
  const formattedSpecs = specs.map(formatSpec)
  return formattedSpecs
}

export const findSpec = async where => {
  const foundSpec = await Spec.findOne({
    where,
    include: [
      {
        model: Ingredient,
        as: "ingredients",
        through: {
          model: SpecIngredient,
          as: "specIngredients"
        }
      },
      {
        model: User,
        as: "contributedBy"
      }
    ]
  })
  const formattedFoundSpec = formatSpec(foundSpec)
  return formattedFoundSpec
}

export const createSpec = async ({ spec }, user) => {
  const ingredients = spec.ingredients
  const newSpec = await Spec.create({ ...spec, contributedById: user })
  ingredients.forEach(async ingredient => {
    const foundIngredient = await Ingredient.findOne({
      where: { name: ingredient.name }
    })
    delete ingredient.name
    try {
      await SpecIngredient.create({
        specId: newSpec.id,
        ingredientId: foundIngredient.id,
        ...ingredient
      })
    } catch (err) {
      console.log(err)
    }
  })
  return Spec.findOne({
    where: { id: newSpec.id },
    include: [
      {
        model: Ingredient,
        as: "ingredients",
        through: {
          model: SpecIngredient,
          as: "SpecIngredients"
        }
      },
      {
        model: User,
        as: "contributedBy"
      }
    ]
  })
}

export const editSpec = async (id, updates) => {
  const specToUpdate = await Spec.findByPk(id)
  const ingredients = await specToUpdate.getIngredients()
  await specToUpdate.removeIngredients(ingredients)
  const { spec } = updates
  spec.ingredients.forEach(async ingredient => {
    const foundIngredient = await Ingredient.findOne({
      where: { name: ingredient.name }
    })
    delete ingredient.name
    try {
      await SpecIngredient.create({
        specId: specToUpdate.id,
        ingredientId: foundIngredient.id,
        ...ingredient
      })
    } catch (err) {
      console.log(err)
    }
  })
  delete spec.ingredients
  await Spec.update(
    {
      ...spec
    },
    { where: { id } }
  )
  const theSpec = await Spec.findOne({
    where: { id },
    include: [
      {
        model: Ingredient,
        as: "ingredients",
        through: {
          model: SpecIngredient,
          as: "SpecIngredients"
        }
      },
      {
        model: User,
        as: "contributedBy"
      }
    ]
  })
  const formattedFoundSpec = formatSpec(theSpec)
  return formattedFoundSpec
}

export const deleteSpec = async id => {
  const SpecToDelete = await Spec.findByPk(id)
  try {
    const result = await Spec.destroy({ where: { id } })
    return SpecToDelete
  } catch (err) {
    throw Error("Could not delete that spec.")
  }
}

const formatFilter = rawFilter => {
  const filter = {}
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

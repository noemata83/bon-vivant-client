import Spec from "./Spec.mjs"
import Ingredient from "../Ingredients/Ingredient.mjs"
import { SpecIngredient } from "../Ingredients/Ingredient.mjs"

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
  id: spec.id,
  riffOn: spec.riffOn,
  ingredients: spec.ingredients.map(formatSpecIngredients)
})

export const fetchAllSpecs = async (filter, limit) => {
  const specs = await Spec.findAll({
    where: filter,
    limit,
    include: [
      {
        model: Ingredient,
        through: "specIngredients",
        as: "ingredients"
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
        as: "ingredients"
      }
    ]
  })
  const formattedFoundSpec = formatSpec(foundSpec)
  return formattedFoundSpec
}

export const createSpec = async ({ spec }) => {
  const ingredients = spec.ingredients
  const newSpec = await Spec.create({ ...spec })
  ingredients.forEach(async ingredient => {
    const foundIngredient = await Ingredient.findOne({
      where: { name: ingredient.name }
    })
    delete ingredient.name
    try {
      await newSpec.addIngredient(foundIngredient, {
        through: { ...ingredient }
      })
    } catch (err) {
      console.log(err)
    }
  })
  return Spec.findOne(
    { where: { id: newSpec.id } },
    {
      include: [
        {
          model: Ingredient,
          as: "ingredients",
          through: {
            model: SpecIngredient,
            as: "specIngredients"
          }
        }
      ]
    }
  )
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
    await SpecIngredient.create({
      ingredientId: foundIngredient.id,
      specId: id,
      ...ingredient
    })
  })
  delete spec.ingredients
  const updatedSpec = await Spec.update(
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
        as: "ingredients"
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

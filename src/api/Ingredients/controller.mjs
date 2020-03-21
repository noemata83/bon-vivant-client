// import IngredientFamily from "./IngredientFamily"
import models from "../models/"

const { Ingredient, IngredientFamily } = models

export const registerIngredientType = async ({ family }) => {
  try {
    const newIngredientFamily = await IngredientFamily.create(family)
    return newIngredientFamily
  } catch (err) {
    console.log(err)
  }
}
export const fetchAllIngredientTypes = () => {
  return IngredientFamily.findAll()
}

export const fetchOneIngredientType = id => {
  return IngredientFamily.findByPk(id)
}

export const updateIngredientType = async (id, update) => {
  return IngredientFamily.update(
    {
      ...update
    },
    {
      where: {
        id
      },
      returning: true,
      plain: true
    }
  )
}

export const deleteIngredientType = async ({ id }) => {
  return IngredientType.destroy({
    where: {
      id
    }
  })
}

export const createIngredient = async ({ ingredient }) => {
  const newIngredient = await Ingredient.create(ingredient)
  ingredient.family.forEach(fam => {
    newIngredient.addFamily(fam)
  })
  const createdIngredient = Ingredient.findOne({
    where: { id: newIngredient.id },
    include: [
      {
        model: IngredientFamily,
        as: "family",
        required: false,
        through: "IngredientsAndFamilies"
      }
    ]
  })
  return createdIngredient
}

export const fetchAllIngredients = async () => {
  const allIngredients = await Ingredient.findAll({
    include: [
      {
        model: IngredientFamily,
        as: "family",
        through: "IngredientsAndFamilies"
      }
    ]
  })
  return allIngredients
}

export const findIngredient = args => {
  const where = {}
  if (args.id) {
    where.id = args.id
  }
  if (args.slug) {
    where.slug = {
      eq: args.slug
    }
  }
  return Ingredient.findOne({
    where,
    include: [
      {
        model: IngredientFamily,
        as: "family",
        through: "IngredientsAndFamilies"
      }
    ]
  })
}

export const editIngredient = async (id, update) => {
  return Ingredient.update({ ...update }, { where: { id } })
}

export const deleteIngredient = async id => {
  const ingredientToDelete = await Ingredient.destroy({ where: { id } })
  return ingredientToDelete
}

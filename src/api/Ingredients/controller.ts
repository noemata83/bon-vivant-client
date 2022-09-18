import { Ingredient, IngredientFamily } from "../models"

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

export const fetchOneIngredientType = (id) => {
  return IngredientFamily.findByPk(id)
}

export const updateIngredientType = async (id, update) => {
  return IngredientFamily.update(
    {
      ...update,
    },
    {
      where: {
        id,
      },
      returning: true,
    }
  )
}

export const deleteIngredientType = async ({ id }) => {
  return IngredientFamily.destroy({
    where: {
      id,
    },
  })
}

export const createIngredient = async ({ ingredient }) => {
  const newIngredient = await Ingredient.create(ingredient)
  ingredient.family.forEach((fam) => {
    newIngredient.family.push(fam)
  })
  const createdIngredient = Ingredient.findOne({
    where: { id: newIngredient.id },
    include: [
      {
        model: IngredientFamily,
        as: "family",
        required: false,
      },
    ],
  })
  return createdIngredient
}

export const fetchAllIngredients = async () => {
  const allIngredients = (
    await Ingredient.findAll({
      include: [IngredientFamily],
    })
  ).map((el) => el.toJSON())
  return allIngredients
}

export const findIngredient = async (args) => {
  const where: any = {}
  if (args.id) {
    where.id = args.id
  }
  if (args.slug) {
    where.slug = {
      eq: args.slug,
    }
  }
  console.log(
    await Ingredient.findOne({
      where,
      include: [IngredientFamily],
      plain: true,
    })
  )
  return (
    await Ingredient.findOne({
      where,
      include: [IngredientFamily],
      plain: true,
    })
  ).toJSON()
}

export const editIngredient = async (id, update) => {}

export const deleteIngredient = async (id) => {
  const ingredientToDelete = await Ingredient.destroy({ where: { id } })
  return ingredientToDelete
}

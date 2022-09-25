import { Ingredient } from "../models"

export const createIngredient = async ({ ingredient }) => {
  const newIngredient = await Ingredient.create(ingredient)
  const createdIngredient = Ingredient.findOne({
    where: { id: newIngredient.id },
    include: [Ingredient],
  })
  return createdIngredient
}

export const fetchAllIngredients = async () => {
  const allIngredients = (
    await Ingredient.findAll({
      include: [Ingredient],
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
  return (
    await Ingredient.findOne({
      where,
      include: [Ingredient],
      plain: true,
    })
  ).toJSON()
}

export const editIngredient = async (id, update) => {
  const { ingredient } = update
  await Ingredient.update(ingredient, {
    where: { id: { eq: id } },
  })
  return (await Ingredient.findByPk(id, { include: [Ingredient] })).toJSON()
}

export const deleteIngredient = async (id) => {
  const ingredientToDelete = await Ingredient.destroy({ where: { id } })
  return ingredientToDelete
}

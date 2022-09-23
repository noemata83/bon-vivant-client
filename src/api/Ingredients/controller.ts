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
  const familyPromises = ingredient.family.map((famPk) =>
    IngredientFamily.findByPk(famPk)
  )
  const families = await Promise.all(familyPromises)
  const newIngredient = await Ingredient.create(ingredient)
  await newIngredient.$add("family", families)
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
      include: [IngredientFamily],
      plain: true,
    })
  ).toJSON()
}

export const editIngredient = async (id, update) => {
  const { ingredient } = update
  const familiesPromises = ingredient.family.map((famPk) =>
    IngredientFamily.findByPk(famPk)
  )
  await Ingredient.update(ingredient, {
    where: { id: { eq: id } },
  })
  const updatedIngredient = await Ingredient.findByPk(id)
  const families = await Promise.all(familiesPromises)
  await updatedIngredient.$set("family", families)
  return (
    await Ingredient.findByPk(id, { include: [IngredientFamily] })
  ).toJSON()
}

export const deleteIngredient = async (id) => {
  const ingredientToDelete = await Ingredient.destroy({ where: { id } })
  return ingredientToDelete
}

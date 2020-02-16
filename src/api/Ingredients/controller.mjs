import IngredientFamily from "./IngredientFamily"
import Ingredient, { IngFamily } from "./Ingredient"

export const registerIngredientType = async ({ family }) => {
  const newIngredientFamily = await IngredientFamily.create(family)
  return newIngredientFamily
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
  // console.log(JSON.stringify(ingredient, null, 4))
  const newIngredient = await Ingredient.create(ingredient)
  // console.log(newIngredient)
  // newIngredient.setIngredientFamily(families)
  const familyRelations = ingredient.family.map(family =>
    IngFamily.create({ familyId: family, ingredientId: newIngredient.id })
  )
  await Promise.all(familyRelations)
  const createdIngredient = Ingredient.findOne({
    where: { id: newIngredient.id },
    include: [
      {
        model: IngredientFamily,
        as: "family",
        required: false,
        through: {
          model: IngFamily,
          as: "ingFamilies"
        }
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
        through: {
          model: IngFamily,
          as: "ingFamilies"
        }
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
        through: {
          model: IngFamily,
          as: "ingFamilies"
        }
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

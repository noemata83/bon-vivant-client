import {
  findIngredient,
  fetchAllIngredients,
  fetchAllIngredientTypes,
} from "./controller"

export default {
  Query: {
    ingredient(_, args) {
      return findIngredient(args)
    },
    ingredients(_, args) {
      return fetchAllIngredients()
    },
  },
}

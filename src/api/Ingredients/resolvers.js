export const ingredientResolvers = {
  Query: {
    ingredient(_, args) {
      return findIngredient(args)
    },
    ingredients(_, args) {
      return fetchAllIngredients()
    },
    ingredientFamilies(_, args) {
      return fetchAllIngredientTypes()
    }
  }
}

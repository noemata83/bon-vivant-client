export default {
  Mutation: {
    registerIngredientType(_, args) {
      return registerIngredientType(args)
    },
    deleteIngredientType(_, args) {
      return deleteIngredientType(args.id)
    },
    addIngredient(_, args) {
      return createIngredient(args)
    },
    editIngredient(_, args) {
      return editIngredient(args.id, args)
    },
    deleteIngredient(_, args) {
      return deleteIngredient(args.id)
    }
  }
}

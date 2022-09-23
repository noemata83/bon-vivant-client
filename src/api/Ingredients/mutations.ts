import {
  registerIngredientType,
  deleteIngredientType,
  createIngredient,
  editIngredient,
  deleteIngredient,
} from "./controller"

export default {
  Mutation: {
    addIngredient(_, args) {
      return createIngredient(args)
    },
    editIngredient(_, args) {
      return editIngredient(args.id, args)
    },
    deleteIngredient(_, args) {
      return deleteIngredient(args.id)
    },
  },
}

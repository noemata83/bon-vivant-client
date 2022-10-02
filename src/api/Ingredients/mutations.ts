import { hasPermission } from "../Users/authorization/authorization"
import { PermissionType } from "../Users/authorization/permission.enum"
import {
  createIngredient,
  editIngredient,
  deleteIngredient,
} from "./controller"

export default {
  Mutation: {
    addIngredient(_, args, { user }) {
      return createIngredient(args, user)
    },
    editIngredient(_, args, { user }) {
      return editIngredient(args.id, args, user)
    },
    deleteIngredient(_, args) {
      return deleteIngredient(args.id)
    },
  },
}

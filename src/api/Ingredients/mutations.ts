import { ApplicationContext } from "../../../pages/api/graphql"
import { hasPermission } from "../Users/authorization/authorization"
import { PermissionType } from "../Users/authorization/permission.enum"
import {
  CreateIngredientCommand,
  DeleteIngredientCommand,
  EditIngredientCommand,
} from "./commands"
import {
  createIngredient,
  editIngredient,
  deleteIngredient,
} from "./controller"

export default {
  Mutation: {
    addIngredient(_: any, args: any, { user }: ApplicationContext) {
      const command: CreateIngredientCommand = {
        ingredient: args.ingredient,
        user,
      }
      return createIngredient(command)
    },
    editIngredient(_: any, args: any, { user }: ApplicationContext) {
      const command: EditIngredientCommand = {
        id: args.id,
        update: args.ingredient,
        user,
      }
      return editIngredient(command)
    },
    deleteIngredient(_: any, args: any, { user }: ApplicationContext) {
      const command: DeleteIngredientCommand = {
        id: args.id,
        user,
      }
      return deleteIngredient(command)
    },
  },
}

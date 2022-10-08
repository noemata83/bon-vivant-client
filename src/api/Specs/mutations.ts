import { ApplicationContext } from "../../../pages/api/graphql"
import Ingredient from "../../client/components/Ingredient"
import { Review, Spec, SpecIngredient, User } from "../models"
import {
  CreateSpecCommand,
  DeleteSpecCommand,
  EditSpecCommand,
} from "./commands"
import { createSpec, editSpec, deleteSpec } from "./controller"

export default {
  Mutation: {
    async createSpec(_, args, context: ApplicationContext) {
      const command: CreateSpecCommand = {
        spec: args.spec,
        user: context.user,
      }
      const newspec = await createSpec(command)
      return newspec
    },
    editSpec(_, args, context: ApplicationContext) {
      const command: EditSpecCommand = {
        id: args.id,
        updates: args.updates,
        user: context.user,
      }
      return editSpec(command)
    },
    deleteSpec(_, args, context: ApplicationContext) {
      const command: DeleteSpecCommand = {
        id: args.id,
        user: context.user,
      }
      return deleteSpec(command)
    },
  },
}

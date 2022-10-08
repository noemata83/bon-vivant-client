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
    async createSpec(_, args, context) {
      const command: CreateSpecCommand = {
        spec: args.spec,
        user: context.user,
        specRepository: context.sequelize.getRepository(Spec),
        specIngredientRepository:
          context.sequelize.getRepository(SpecIngredient),
        userRepository: context.sequelize.getRepository(User),
        ingredientRepository: context.sequelize.getRepository(Ingredient),
      }
      const newspec = await createSpec(command)
      return newspec
    },
    editSpec(_, args, context) {
      const command: EditSpecCommand = {
        id: args.id,
        updates: args.updates,
        user: context.user,
        specRepository: context.sequelize.getRepository(Spec),
        specIngredientRepository:
          context.sequelize.getRepository(SpecIngredient),
        userRepository: context.sequelize.getRepository(User),
        ingredientRepository: context.sequelize.getRepository(Ingredient),
        reviewRepository: context.sequelize.getRepository(Review),
      }
      return editSpec(command)
    },
    deleteSpec(_, args, context) {
      const command: DeleteSpecCommand = {
        id: args.id,
        user: context.user,
        specRepository: context.sequelize.getRepository(Spec),
      }
      return deleteSpec(command)
    },
  },
}

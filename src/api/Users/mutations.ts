import { ApplicationContext } from "../../../pages/api/graphql"
import { User } from "../models"
import { Permission } from "../models/permission.model"
import { UserRole } from "../models/userRole.model"
import { SignUpCommand, UserSignupParameters } from "./commands"
import {
  addIngredientToShelf,
  addSpecToBook,
  signUp,
  login,
  deleteUser,
  removeIngredientFromShelf,
  removeSpecFromBook,
} from "./controller"

export default {
  Mutation: {
    addIngredientToShelf(_, args, { user }: ApplicationContext) {
      if (!user) {
        throw new Error("You are not logged in.")
      }
      return addIngredientToShelf(user, args.id)
    },
    removeIngredientFromShelf(_, args, { user }: ApplicationContext) {
      if (!user) {
        throw new Error("You are not logged in.")
      }
      return removeIngredientFromShelf(user, args.id)
    },
    addSpecToBook(_, args, { user }: ApplicationContext) {
      if (!user) {
        throw new Error("You are not logged in.")
      }
      return addSpecToBook(user, args.id)
    },
    removeSpecFromBook(_, args, { user }: ApplicationContext) {
      if (!user) {
        throw new Error("You are not logged in.")
      }
      return removeSpecFromBook(user, args.id)
    },
    signUp(_, args, context: ApplicationContext) {
      const params: UserSignupParameters = {
        username: args.username,
        password: args.password,
        email: args.email,
        contribute: args.contribute,
      }
      return SignUpCommand.make(params, context.res)
        .map<SignUpCommand>((command: SignUpCommand) => signUp(command))
        .match({
          ok: (result) => result,
          err: (err) => {
            throw err
          },
        })
    },
    login(_, args, { res }: ApplicationContext) {
      return login(args.username, args.password, res)
    },
    deleteUser(_, args) {
      return deleteUser(args.id)
    },
  },
}

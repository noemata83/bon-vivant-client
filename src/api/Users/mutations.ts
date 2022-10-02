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
    addIngredientToShelf(parentValue, args, { user }) {
      if (!user) {
        throw new Error("You are not logged in.")
      }
      return addIngredientToShelf(user, args.id)
    },
    removeIngredientFromShelf(_, args, { user }) {
      if (!user) {
        throw new Error("You are not logged in.")
      }
      return removeIngredientFromShelf(user, args.id)
    },
    addSpecToBook(_, args, { user }) {
      if (!user) {
        throw new Error("You are not logged in.")
      }
      return addSpecToBook(user, args.id)
    },
    removeSpecFromBook(_, args, { user }) {
      if (!user) {
        throw new Error("You are not logged in.")
      }
      return removeSpecFromBook(user, args.id)
    },
    signUp(_, args, { res }) {
      return signUp(
        args.username,
        args.password,
        args.email,
        args.contribute,
        res
      )
    },
    login(_, args, { res }) {
      return login(args.username, args.password, res)
    },
    deleteUser(_, args) {
      return deleteUser(args.id)
    },
  },
}

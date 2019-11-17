export default {
  Mutation: {
    addIngredientToShelf(parentValue, args, { user }) {
      if (!user) {
        throw new Error("You are not logged in.")
      }
      return addIngredientToShelf(user.id, args.id)
    }
  },
  addSpecToBook(_, args, { user }) {
    if (!user) {
      throw new Error("You are not logged in.")
    }
    return addSpecToBook(user.id, args.id)
  },
  signUp(_, args, { res }) {
    return signUp(args.username, args.password, args.email, res)
  },
  login(_, args, { res }) {
    return login(args.username, args.password, res)
  },
  deleteUser(_, args) {
    return deleteUser(args.id)
  }
}

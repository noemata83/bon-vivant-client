import { User } from "../models"
import { UserRole } from "../models/userRole.model"

export default {
  Query: {
    async users(parent, args, context) {
      return context.all.load(User)
    },
    async me(_, args, { user, single }) {
      if (!user) {
        throw new Error("You are not authenticated!")
      }
      return single.load(User, user.id)
    },
  },
  User: {
    role: (user, _args, context) => {
      return context.single.load(UserRole, user.roleId)
    },
    book: (user, args, context) => {
      return context.cocktailBooks.load(user.id)
    },
    shelf: (user, _args, context) => {
      console.log("hi")
      return context.shelf.load(user.id)
    },
  },
  UserRole: {
    permissions: (userRole, _args, context) => {
      return context.permissions.load(userRole.id)
    },
  },
}

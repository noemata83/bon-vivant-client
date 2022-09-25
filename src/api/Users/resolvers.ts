import { User } from "../models"
import { getAllUsers, getUserById } from "./controller"

export default {
  Query: {
    async users(parent, args, context) {
      return context.all.load(User)
    },
    async me(_, args, { user }) {
      if (!user) {
        throw new Error("You are not authenticated!")
      }
      return getUserById(user)
    },
  },
}

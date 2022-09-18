import { getAllUsers, getUserById } from "./controller"

export default {
  Query: {
    async users(parent, args) {
      return getAllUsers()
    },
    async me(_, args, { user }) {
      if (!user) {
        throw new Error("You are not authenticated!")
      }
      return getUserById(user)
    },
  },
}

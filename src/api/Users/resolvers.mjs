import { getAllUsers, getUserById } from "./controller.mjs"

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
    async whatICanMake(_, args, { user }) {
      if (!user) {
        throw new Error("You are not authenticated!")
      }
      return getAvailableSpecs(user.id)
    }
  }
}

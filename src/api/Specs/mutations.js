import { createSpec, editSpec, deleteSpec } from "./controller"

export default {
  Mutation: {
    async createSpec(parentValue, args, { user }) {
      if (!user) {
        throw new Error("You are not authenticated!")
      }
      const newspec = await createSpec(args)
      return newspec
    },
    editSpec(_, args, { user }) {
      if (!user) {
        throw new Error("You are not authenticated!")
      }
      return editSpec(args.id, args)
    },
    deleteSpec(_, args) {
      if (!user) {
        throw new Error("You are not authenticated!")
      }
      return deleteSpec(args.id)
    }
  }
}

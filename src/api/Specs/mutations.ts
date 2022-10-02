import { createSpec, editSpec, deleteSpec } from "./controller"

export default {
  Mutation: {
    async createSpec(parentValue, args, { user }) {
      const newspec = await createSpec(args, user)
      return newspec
    },
    editSpec(_, args, { user }) {
      return editSpec(args.id, args, user)
    },
    deleteSpec(_, args, { user }) {
      if (!user) {
        throw new Error("You are not authenticated!")
      }
      return deleteSpec(args.id)
    },
  },
}

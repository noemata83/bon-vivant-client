import { createSpec, editSpec, deleteSpec } from "./controller"

export default {
  Mutation: {
    async createSpec(parentValue, args, context) {
      const newspec = await createSpec(args, context.user)
      return newspec
    },
    editSpec(_, args, context) {
      return editSpec(args.id, args, context.user)
    },
    deleteSpec(_, args, context) {
      return deleteSpec(args.id, context.user)
    },
  },
}

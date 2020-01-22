import { createSpec, editSpec, deleteSpec } from "./controller"

export default {
  Mutation: {
    async createSpec(parentValue, args) {
      const newspec = await createSpec(args)
      return newspec
    },
    editSpec(_, args) {
      return editSpec(args.id, args)
    },
    deleteSpec(_, args) {
      return deleteSpec(args.id)
    }
  }
}

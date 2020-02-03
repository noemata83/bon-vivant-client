import { findSpec, fetchAllSpecs } from "./controller"
export default {
  Query: {
    spec(_, args) {
      const where = {}
      if (args.id) where.id = args.id
      if (args.slug) where.slug = args.slug
      return findSpec(where)
    },
    specs(_, args) {
      return fetchAllSpecs(args.filter, args.limit)
    }
  }
}

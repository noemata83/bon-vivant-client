import { findSpec, fetchAllSpecs } from "./controller"

interface SpecQuery {
  id?: string
  slug?: string
  name?: string
}

export default {
  Query: {
    spec(_, args) {
      const where: SpecQuery = {}
      if (args.id) where.id = args.id
      if (args.slug) where.slug = args.slug
      if (args.name) where.name = args.name
      return findSpec(where)
    },
    specs(_, args) {
      return fetchAllSpecs(args.filter, args.limit)
    },
  },
}

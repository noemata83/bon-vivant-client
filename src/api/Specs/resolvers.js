import { findSpec, fetchAllSpecs } from "./controller"
export default {
  Query: {
    spec(_, args) {
      return findSpec(args)
    },
    specs(_, args) {
      return fetchAllSpecs(args.filter, args.limit)
    }
  }
}

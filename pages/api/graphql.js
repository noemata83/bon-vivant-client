import { ApolloServer, gql } from "apollo-server-micro"
import { mergeResolvers } from "graphql-toolkit"
import ingredientsResolvers from "../../src/api/Ingredients/resolvers"
import ingredientsMutations from "../../src/api/Ingredients/mutations"
import specResolvers from "../../src/api/Specs/resolvers"
import specMutations from "../../src/api/Specs/mutations"
import typeDefs from "../../src/api/types.graphql"
import { syncDB } from "../../src/api/syncDB"

const resolvers = mergeResolvers([
  ingredientsResolvers,
  specResolvers,
  specMutations,
  ingredientsMutations
])

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false
  }
}

const server = apolloServer.createHandler({ path: "/api/graphql" })
export default syncDB(server)

import { ApolloServer, gql } from "apollo-server-micro"
import { mergeResolvers } from "graphql-toolkit"
import ingredientsResolvers from "../../src/api/Ingredients/resolvers"
import ingredientsMutations from "../../src/api/Ingredients/mutations"
import typeDefs from "../../src/api/types.graphql"
import { syncDB } from "../../src/api/syncDB"

// const fakeTypeDefs = gql`
//   type Query {
//     sayHello: String
//   }
// `

// const fakeResolvers = {
//   Query: {
//     sayHello: () => {
//       return "Hello, World!"
//     }
//   }
// }

console.log(JSON.stringify(typeDefs, null, 4))

const resolvers = mergeResolvers([ingredientsResolvers, ingredientsMutations])

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false
  }
}

const server = apolloServer.createHandler({ path: "/api/graphql" })
export default syncDB(server)

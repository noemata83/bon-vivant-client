import { ApolloServer, gql } from "apollo-server-micro"
import { syncDB } from "../../src/api/syncDB"

const typeDefs = gql`
  type Query {
    sayHello: String
  }
`

const resolvers = {
  Query: {
    sayHello: () => {
      return "Hello, World!"
    }
  }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false
  }
}

const server = apolloServer.createHandler({ path: "/api/graphql" })
export default syncDB(server)

import jwt from "jsonwebtoken"
import env from "../../config/keys"
import { ApolloServer } from "apollo-server-micro"
import { mergeResolvers } from "@graphql-tools/merge"
import ingredientsResolvers from "../../src/api/Ingredients/resolvers"
import ingredientsMutations from "../../src/api/Ingredients/mutations"
import specResolvers from "../../src/api/Specs/resolvers"
import specMutations from "../../src/api/Specs/mutations"
import userResolvers from "../../src/api/Users/resolvers"
import userMutations from "../../src/api/Users/mutations"
import reviewMutations from "../../src/api/Reviews/mutations"

import typeDefs from "../../src/api/types"
import { syncDB } from "../../src/api/syncDB"

const resolvers = mergeResolvers([
  ingredientsResolvers,
  specResolvers,
  specMutations,
  ingredientsMutations,
  userResolvers,
  userMutations,
  reviewMutations,
])

const context = (integrationContext) => ({
  req: integrationContext.req,
  res: integrationContext.res,
  user: integrationContext.req.user,
})

const apolloServer = new ApolloServer({ typeDefs, resolvers, context })

export const config = {
  api: {
    bodyParser: false,
  },
}

const auth = (handler) => (req, res) => {
  let token = ""
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1]
    if (token) {
      try {
        const decoded = jwt.verify(token, env.SECRET)
        req.user = decoded.id
      } catch (err) {
        throw new Error(err)
      }
    }
  }
  return handler(req, res)
}

const startServer = apolloServer.start()
export default auth(
  syncDB(async (req, res) => {
    await startServer
    await apolloServer.createHandler({ path: "/api/graphql" })(req, res)
  })
)

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
import { ByIdLoader } from "../../src/api/loaders/single"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { BySlugLoader } from "../../src/api/loaders/slug"
import { ByNameLoader } from "../../src/api/loaders/name"
import { AssociatedCollectionLoader } from "../../src/api/loaders/collection"
import { AllLoader } from "../../src/api/loaders/all"
import { SampleCocktailsLoader } from "../../src/api/loaders/ingredients/sampleCocktails"
import { UserRolePermissionLoader } from "../../src/api/loaders/permission"
import { CocktailBookLoader } from "../../src/api/loaders/cocktailbooks/cocktailbook"
import { ShelfLoader } from "../../src/api/loaders/shelf/shelf"

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
  single: new ByIdLoader(),
  slug: new BySlugLoader(),
  name: new ByNameLoader(),
  collection: new AssociatedCollectionLoader(),
  all: new AllLoader(),
  permissions: new UserRolePermissionLoader(),
  ingredients: {
    cocktails: new SampleCocktailsLoader(),
  },
  cocktailBooks: new CocktailBookLoader(),
  shelf: new ShelfLoader(),
})

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})

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
        req.user = {
          username: decoded.username,
          id: decoded.id,
          role: decoded.role,
        }
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

import jwt, { JwtPayload } from "jsonwebtoken"
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
import { sequelize } from "../../src/api/models"
import { AuthenticatedUser } from "../../src/api/Users/authorization/authorization"
import { Sequelize } from "sequelize-typescript"
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { UserRole } from "../../src/api/models/userRole.model"

const resolvers = mergeResolvers([
  ingredientsResolvers,
  specResolvers,
  specMutations,
  ingredientsMutations,
  userResolvers,
  userMutations,
  reviewMutations,
])

interface AuthorizedRequest extends NextApiRequest {
  user?: DecodedPayload
}

interface DecodedPayload extends JwtPayload {
  username: string
  id: string
  role: UserRole
}

export interface ApplicationContext {
  req: NextApiRequest
  res: NextApiResponse
  user: AuthenticatedUser
  single: ByIdLoader
  slug: BySlugLoader
  name: ByNameLoader
  collection: AssociatedCollectionLoader
  all: AllLoader
  permissions: UserRolePermissionLoader
  ingredients: {
    cocktails: SampleCocktailsLoader
  }
  cocktailBooks: CocktailBookLoader
  sequelize: Sequelize
}

const context: (integrationContext: any) => ApplicationContext = (
  integrationContext
) => ({
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
  sequelize: sequelize,
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

const auth =
  (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => {
    let token = ""
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1]
      if (token) {
        const decoded: DecodedPayload = jwt.verify(
          token,
          env.SECRET
        ) as DecodedPayload
        ;(req as AuthorizedRequest).user = {
          username: decoded.username,
          id: decoded.id,
          role: decoded.role,
        }
      }
    }
    return handler(req, res)
  }

const startServer = apolloServer.start()
export default auth(
  syncDB(async (req: NextApiRequest, res: NextApiResponse) => {
    await startServer
    await apolloServer.createHandler({ path: "/api/graphql" })(req, res)
  })
)

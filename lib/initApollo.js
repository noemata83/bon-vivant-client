import { ApolloClient, InMemoryCache } from "apollo-boost"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import fetch from "isomorphic-unfetch"
import config from "../config/keys"

let apolloClient = null

if (typeof window === "undefined") {
  global.fetch = fetch
}

function create(initialState, { getToken, fetchOptions }) {
  const isBrowser = typeof window !== "undefined"
  const httpLink = createHttpLink({
    uri: config.BACKEND_URI,
    credentials: "include",
    fetchOptions
  })

  const authLink = setContext((_, previousContext) => {
    const token = getToken()
    return {
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    }
  })

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: typeof window !== undefined,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo(initialState, options) {
  if (typeof window === "undefined") {
    let fetchOptions = {}
    return create(initialState, {
      ...options,
      fetchOptions
    })
  }

  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}

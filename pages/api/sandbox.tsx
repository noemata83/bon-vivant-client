import sandbox from "@apollo/sandbox/react"
const { ApolloSandbox } = sandbox

export function EmbeddedSandbox() {
  return (
    <ApolloSandbox
      initialEndpoint="http://localhost:3000/api/graphql"
      includeCookies={false}
    />
  )
}

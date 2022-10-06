import gql from "graphql-tag"

export const ME_QUERY = gql`
  query MeQuery {
    me {
      username
      book {
        id
        name
        slug
      }
      shelf {
        id
        name
        slug
      }
    }
  }
`

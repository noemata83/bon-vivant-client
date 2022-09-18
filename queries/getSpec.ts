import gql from "graphql-tag"

export const GET_SPEC = gql`
  query getSpec($slug: String!) {
    spec(slug: $slug) {
      id
      name
      description
      ingredients {
        quantity
        measure
        ingredient {
          id
          name
        }
        canSub
        subWith
      }
      directions
    }
  }
`

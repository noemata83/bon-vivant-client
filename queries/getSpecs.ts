import gql from 'graphql-tag'

export const GET_SPECS = gql`
  {
    specs {
      id
      slug
      name
      description
      ingredients {
        quantity
        measure
        ingredient {
          name
        }
        canSub
        subWith
      }
      directions
    }
  }
`

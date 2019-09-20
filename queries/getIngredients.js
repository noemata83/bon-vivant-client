import gql from 'graphql-tag'
export const GET_INGREDIENTS = gql`
  query {
    ingredientTypes {
      name
      id
    }
    ingredients {
      name
      slug
      id
      family {
        name
        id
      }
    }
  }
`

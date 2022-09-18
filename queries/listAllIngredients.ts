import gql from "graphql-tag"

export const INGREDIENT_LIST_QUERY = gql`
  query {
    ingredientFamilies {
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

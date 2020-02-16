import gql from "graphql-tag"

export const ADD_SPEC = gql`
  mutation addSpec(
    $name: String!
    $description: String
    $ingredients: [SpecIngredientInput]!
    $directions: String!
  ) {
    createSpec(
      name: $name
      description: $description
      ingredients: $ingredients
      directions: $directions
    ) {
      name
      id
    }
  }
`

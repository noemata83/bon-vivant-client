import gql from 'graphql-tag'

export const ADD_SPEC = gql`
  mutation addSpec(
    $name: String!
    $description: String
    $ingredients: [Spec_Ingredient_Input]!
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

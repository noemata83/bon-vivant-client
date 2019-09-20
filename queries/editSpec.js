import gql from 'graphql-tag'

export const EDIT_SPEC = gql`
  mutation editSpec(
    $id: String!
    $name: String!
    $description: String
    $ingredients: [Spec_Ingredient_Input]!
    $directions: String!
  ) {
    editSpec(
      id: $id
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

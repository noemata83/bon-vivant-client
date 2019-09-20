import gql from 'graphql-tag'

export const ADD_INGREDIENT = gql`
  mutation createIngredient(
    $name: String!
    $description: String
    $family: [String]!
  ) {
    addIngredient(name: $name, description: $description, family: $family) {
      name
      id
      description
    }
  }
`

import gql from 'graphql-tag'

export const EDIT_INGREDIENT = gql`
  mutation editIngredient(
    $id: String!
    $name: String
    $description: String
    $family: [String]
  ) {
    editIngredient(
      id: $id
      name: $name
      description: $description
      family: $family
    ) {
      name
      id
      description
    }
  }
`

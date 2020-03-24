import gql from "graphql-tag"

export const EDIT_SPEC = gql`
  mutation editSpec(
    $id: String!
    $name: String!
    $description: String
    $ingredients: [SpecIngredientInput]!
    $directions: String!
  ) {
    editSpec(
      id: $id
      spec: {
        name: $name
        description: $description
        ingredients: $ingredients
        directions: $directions
      }
    ) {
      name
      id
    }
  }
`

import gql from "graphql-tag"

export const DELETE_SPEC = gql`
  mutation deleteSpec($id: String!) {
    deleteSpec(id: $id) {
      name
      id
    }
  }
`

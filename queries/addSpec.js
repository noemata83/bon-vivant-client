import gql from "graphql-tag"

export const ADD_SPEC = gql`
  mutation addSpec($spec: SpecInput) {
    createSpec(spec: $spec) {
      name
      id
    }
  }
`

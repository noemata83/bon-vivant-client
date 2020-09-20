import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import Autocomplete from "./autocomplete"

const INGREDIENT_QUERY = gql`
  query {
    ingredients {
      name
      slug
    }
  }
`

const IngredientNameInput = props => {
  const { loading, data, error } = useQuery(INGREDIENT_QUERY)
  if (loading) return "Loading ..."
  if (error) return `Woops: ${error}`
  const { ingredients } = data
  return <Autocomplete data={ingredients} label="name" {...props} />
};

export default IngredientNameInput;

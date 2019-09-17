import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const GET_INGREDIENT = gql`
  query findIngredient($slug: String!) {
    ingredient(slug: $slug) {
      name
      slug
      id
      family {
        name
        id
      }
      description
    }
  }
`

export default ({ slug }) => {
  const { loading, error, data } = useQuery(GET_INGREDIENT, {
    variables: { slug }
  })
  if (loading) return 'Loading...'
  if (error) return `Error: ${error.message}`
  const { ingredient } = data
  console.log(ingredient)
  return (
    <div>
      <h1>{ingredient.name}</h1>
      {ingredient.family.map(fam => (
        <h2 key={fam.name}>{fam.name}</h2>
      ))}
      <p>{ingredient.description}</p>
    </div>
  )
}

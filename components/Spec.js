import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Container from './layout/container';

const GET_SPEC = gql`
  query getSpec($slug: String!) {
    spec(slug:$slug) {
      name
      description
      ingredients {
        quantity
        measure
        ingredient {
          name
        }
        canSub
        subWith   
      }
      directions
    }
  }
`;

export default ({ slug }) => {
  const { loading, error, data } = useQuery(GET_SPEC, { variables: { slug }});
  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`
  const { spec } = data;
  return (
    <div>
      <h1>{spec.name}</h1>
      <p>{spec.description}</p>
      <ul>
        {spec.ingredients.map(specIngredient => (
          <li key={specIngredient.ingredient.id}>{`${specIngredient.quantity} ${specIngredient.measure ? specIngredient.measure.toLowerCase() : ''} ${specIngredient.ingredient.name}`}</li>
        ))}
      </ul>
      <p>{spec.directions}</p>
    </div>
  )
}

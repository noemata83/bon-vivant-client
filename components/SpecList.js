import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const GET_SPECS = gql`
  {
    specs {
      id
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

export default () => {
  const { loading, error, data } = useQuery(GET_SPECS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
    {data.specs.map(spec => (
      <div key={spec.id}>
        <h1>{spec.name}</h1>
        <p>{spec.description}</p>
      </div>))}
    </div>
  )
}
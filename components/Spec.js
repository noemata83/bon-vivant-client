import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import Link from "next/link"
import Container from "./layout/container"
import styled from "styled-components"
import { connect } from "react-redux"

const GET_SPEC = gql`
  query getSpec($slug: String!) {
    spec(slug: $slug) {
      name
      slug
      description
      ingredients {
        quantity
        measure
        ingredient {
          id
          slug
          name
        }
        canSub
        subWith
      }
      directions
    }
  }
`

const Spec = ({ slug, isLoggedIn }) => {
  const { loading, error, data } = useQuery(GET_SPEC, { variables: { slug } })
  if (loading) return "Loading..."
  if (error) return `Error: ${error.message}`
  const { spec } = data
  return (
    <div>
      <SpecHeader>
        <h1>{spec.name}</h1>
        {isLoggedIn && (
          <Link
            href={`/cocktails/[slug]/edit`}
            as={`/cocktails/${spec.slug}/edit`}
          >
            <a>Edit</a>
          </Link>
        )}
      </SpecHeader>
      <p>{spec.description}</p>
      <ul>
        {spec.ingredients.map(specIngredient => (
          <li key={specIngredient.ingredient.id}>
            {`${specIngredient.quantity} ${
              specIngredient.measure ? specIngredient.measure.toLowerCase() : ""
            } `}
            <Link href={`/ingredients/${specIngredient.ingredient.slug}`}>
              <a>{specIngredient.ingredient.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <p>{spec.directions}</p>
    </div>
  )
}

const SpecHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps)(Spec)

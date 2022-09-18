import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/client"
import Link from "next/link"
import styled from "styled-components"
import { connect } from "react-redux"
import { DELETE_SPEC } from "../queries/deleteSpec"
import Router from "next/router"

const GET_SPEC = gql`
  query getSpec($slug: String!) {
    spec(slug: $slug) {
      id
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
        subWith {
          id
          name
        }
      }
      directions
    }
  }
`

type ISpec = {
  slug: string | string[]
  isLoggedIn: boolean
}

const Spec: (props: ISpec) => JSX.Element = ({ slug, isLoggedIn }) => {
  const { loading, error, data } = useQuery(GET_SPEC, { variables: { slug } })
  const [deleteSpec] = useMutation(DELETE_SPEC, {
    onCompleted: () => {
      Router.push("/")
    },
    onError: (err) => {
      console.error("Unable to delete spec!", err)
    },
  })
  if (loading) return <>"Loading..."</>
  if (error) return <>`Error: ${error.message}`</>
  const { spec } = data
  console.log({ spec })
  return (
    <div>
      <SpecHeader>
        <h1>{spec.name}</h1>
        {isLoggedIn && (
          <div>
            <Link
              href={`/cocktails/[slug]/edit`}
              as={`/cocktails/${spec.slug}/edit`}
            >
              <a>Edit</a>
            </Link>
            <a
              onClick={() => {
                deleteSpec({ variables: { id: spec.id } })
              }}
            >
              Delete
            </a>
          </div>
        )}
      </SpecHeader>
      <p>{spec.description}</p>
      <ul>
        {spec.ingredients.map((specIngredient) => (
          <li key={specIngredient.ingredient?.id}>
            {`${specIngredient.quantity} ${
              specIngredient.measure ? specIngredient.measure.toLowerCase() : ""
            } `}
            <Link href={`/ingredients/${specIngredient.ingredient?.slug}`}>
              <a>{specIngredient.ingredient?.name}</a>
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

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
})

export default connect(mapStateToProps)(Spec)

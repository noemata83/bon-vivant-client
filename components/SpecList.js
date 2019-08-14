import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import Link from "next/link"
import styled from "styled-components"
import media from "../global/mediaTemplates"

const GET_SPECS = gql`
  {
    specs {
      id
      slug
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
`

export default () => {
  const { loading, error, data } = useQuery(GET_SPECS)
  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  return (
    <div>
      {data.specs.map(spec => (
        <div key={spec.id}>
          <Link href="/cocktails/[slug]" as={`/cocktails/${spec.slug}`}>
            <SpecLink>{spec.name}</SpecLink>
          </Link>
          <p>{spec.description}</p>
        </div>
      ))}
    </div>
  )
}

const SpecLink = styled.a`
  cursor: pointer;
  font-size: 3.2rem;
  ${media.landscapeTablet`
    font-size: 4.8rem;
  `};
`

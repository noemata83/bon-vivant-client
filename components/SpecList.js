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
  const { loading, error, data } = useQuery(GET_SPECS, {
    fetchPolicy: "no-cache"
  })
  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  return (
    <ul>
      {data.specs.map(spec => (
        <li key={spec.id}>
          <Link href="/cocktails/[slug]" as={`/cocktails/${spec.slug}`}>
            <SpecLink>{spec.name}</SpecLink>
          </Link>
          <ShortDescription>{spec.description}</ShortDescription>
        </li>
      ))}
    </ul>
  )
}

const SpecLink = styled.a`
  cursor: pointer;
  font-size: 2rem;
  ${media.landscapeTablet`
    font-size: 2.8rem;
  `};
`

const ShortDescription = styled.p`
  font-size: 1.4rem;
  margin-top: 0;
`

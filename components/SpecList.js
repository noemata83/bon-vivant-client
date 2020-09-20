import { useQuery } from "@apollo/client"
import Link from "next/link"
import styled from "styled-components"
import media from "../global/mediaTemplates"
import SpecCard from "./SpecCard"

const SpecList = ({ query }) => {
  const { loading, error, data } = useQuery(query, {
    fetchPolicy: "no-cache",
  })
  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  return (
    <SpecGrid>
      {data.specs.map((spec) => (
        <li key={spec.id}>
          <SpecCard spec={spec} />
        </li>
      ))}
    </SpecGrid>
  )
};

export default SpecList;

const SpecGrid = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2rem;
  grid-row-gap: 3rem;
  margin-bottom: 4rem;
`

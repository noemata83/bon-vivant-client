import React from "react"
import Page from "../layouts/main"
import SpecList from "../components/SpecList"
import SpecCard from "../components/SpecCard"
import { GET_SPECS } from "../queries/getSpecs"
import styled from "styled-components"
import media from "../global/mediaTemplates"
import { useQuery } from "@apollo/client"

const Cocktails = () => {
  const { loading, error, data } = useQuery(GET_SPECS)
  if (loading) {
    return "Loading..."
  } else if (error) {
    return `Oops! There was an error: ${error}`
  }
  return (
    <Page>
      <Main>
        <FilterRow>Filters could go here.</FilterRow>
        <ListingRow>
          {data.specs.map((spec) => (
            <SpecCard spec={spec} />
          ))}
        </ListingRow>
      </Main>
    </Page>
  )
};

export default Cocktails;

const Main = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  padding-top: 2rem;
  color: #333;
  flex-grow: 1;
  display: grid;
  grid-template-rows: 0.5fr 10fr;
  grid-row-gap: 2rem;
`

const FilterRow = styled.div`
  grid-rows: 1 / 2;
`

const ListingRow = styled.div`
  grid-rows: 2 / 3;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 4rem;
  grid-column-gap: 2rem;
`

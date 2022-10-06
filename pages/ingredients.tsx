import React from "react"
import Page from "../src/client/components/layouts/main"
import IngredientList from "../src/client/components/IngredientList"
import styled from "styled-components"
import media from "../src/client/global/mediaTemplates"
import { INGREDIENT_LIST_QUERY } from "../src/client/components/queries/listAllIngredients"

const Ingredients = () => (
  <Page>
    <Main>
      <Column>
        <h2>Ingredients</h2>
        <IngredientList query={INGREDIENT_LIST_QUERY} />
      </Column>
    </Main>
  </Page>
)

export default Ingredients
const Main = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  padding-top: 2rem;
  color: #333;
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  ${media.landscapeTablet`
  flex-wrap: nowrap;
`};
`

const Column = styled.div`
  flex-basis: 100%;
  ${media.landscapeTablet`
    flex-basis: 49.25%;
    &:not(:last-child) {
      margin-right: 1.5%;
    }
  `};
`

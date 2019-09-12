import React from 'react'
import Page from '../layouts/main'
import IngredientList from '../components/IngredientList'
import styled from 'styled-components'
import media from '../global/mediaTemplates'

export default ({ props }) => (
  <Page>
    <Main>
      <Column>
        <h2>Ingredients</h2>
        <IngredientList />
      </Column>
    </Main>
  </Page>
)
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

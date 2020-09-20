import React, { useState } from "react"
import styled from "styled-components"
import media from "../global/mediaTemplates"
import SpecList from "../components/SpecList"
import Login from "../components/Login"
import Page from "../layouts/main"
import { connect } from "react-redux"
import Head from "next/head"
import gql from "graphql-tag"
import UserSummary from "../components/UserSummary"

const GET_SPECS = gql`
  {
    specs(limit: 6) {
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

const Index = ({ isLoggedIn }) => (
  <Page isLoggedIn={isLoggedIn}>
    <Head>
      <title>Bon Vivant Cocktails</title>
    </Head>
    <Main>
      <Column>
        <MainTitle>From our Cocktail Library: </MainTitle>
        <SpecList query={GET_SPECS} />
      </Column>
      <Column>{isLoggedIn ? <UserSummary></UserSummary> : <Login />}</Column>
    </Main>
  </Page>
)
const Main = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  padding-top: 4rem;
  color: #333;
  flex-grow: 1;
  display: grid;
  grid-template-columns: 2fr 1fr;
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

const MainTitle = styled.h2`
  margin-top: 0;
`

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
})

export default connect(mapStateToProps)(Index)

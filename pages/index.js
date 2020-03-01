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

const Index = ({ isLoggedIn }) => (
  <Page isLoggedIn={isLoggedIn}>
    <Head>
      <title>Bon Vivant Cocktails</title>
    </Head>
    <Main>
      <Column>
        <h2>From our Cocktail Library: </h2>
        <SpecList query={GET_SPECS} />
      </Column>
      <Column>{isLoggedIn ? <UserSummary></UserSummary> : <Login />}</Column>
    </Main>
  </Page>
)
const Main = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  padding-top: 2rem;
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

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps)(Index)

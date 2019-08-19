import React, { useState } from "react"
import styled from "styled-components"
import SpecList from "../components/SpecList"
import Login from "../components/Login"
import Page from "../layouts/main"
import { connect } from "react-redux"

const Index = ({ isLoggedIn }) => (
  <Page isLoggedIn={isLoggedIn}>
    <Main>
      <SpecList />
      {isLoggedIn ? <div>You are logged in.</div> : <Login />}
    </Main>
  </Page>
)
const Main = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  color: #333;
  flex-grow: 1;
`

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps)(Index)

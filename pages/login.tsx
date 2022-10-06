import React from "react"
import styled from "styled-components"
import Login from "../src/client/components/Login"
import Page from "../src/client/components/layouts/main"
import { connect } from "react-redux"
import auth from "../src/lib/auth"
import { Router } from "next/router"

const LoginPage = ({ isLoggedIn }) => (
  <Page>
    <Main>
      <Login />
    </Main>
  </Page>
)

const Main = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  color: #333;
  flex-grow: 1;
`

export default LoginPage

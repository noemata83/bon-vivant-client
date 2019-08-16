import React from "react"
import styled from "styled-components"
import Login from "../components/Login"
import Page from "../layouts/main"
import { connect } from "react-redux"
import auth from "../lib/auth"
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

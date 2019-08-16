import React, { useState } from "react"
import styled from "styled-components"
import SpecList from "../components/SpecList"
import Login from "../components/Login"
import Page from "../layouts/main"
import { connect } from "react-redux"
import { getLoggedInState } from "../store/actions/"

const Index = ({ isLoggedIn, getAuthState }) => {
  const [initialized, setInitialized] = useState(false)
  if (!initialized) {
    getAuthState()
    setInitialized(true)
  }
  return (
    <Page>
      <Main>
        <SpecList />
        {isLoggedIn ? <div>You are logged in.</div> : <Login />}
      </Main>
    </Page>
  )
}

const Main = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  color: #333;
  flex-grow: 1;
`

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
})

const mapDispatchToProps = dispatch => ({
  getAuthState: () => dispatch(getLoggedInState())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)

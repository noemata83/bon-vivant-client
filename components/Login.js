import { useState } from "react"
import gql from "graphql-tag"
import styled from "styled-components"
import { useMutation } from "@apollo/react-hooks"
import { connect } from "react-redux"
import { setLoggedIn } from "../store/actions/"
import Router from "next/router"
import TextInput from "./UI/form/textInput"

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`

const LoginComponent = ({ updateLoggedInState }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [
    login,
    { error: mutationError, loading: mutationLoading }
  ] = useMutation(LOGIN, {
    onCompleted: data => {
      setUsername("")
      setPassword("")
      if (data.login) {
        updateLoggedInState()
        Router.push("/my-cocktail-book")
      } else {
        setError("Login unsuccessful")
      }
    },
    onError: error => {
      console.log(error)
      setError(error.message)
    }
  })
  const onSubmit = async e => {
    e.preventDefault()
    login({
      variables: { username, password }
    })
  }
  return (
    <LoginForm onSubmit={onSubmit}>
      <TextInput
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        update={e => setUsername(e.target.value)}
      />
      <TextInput
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        update={e => setPassword(e.target.value)}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <SubmitButton type="submit" value="Login" />
    </LoginForm>
  )
}

const LoginForm = styled.form`
  border: 1px solid #ccc;
  background-color: #707070;
  padding: 2rem;
  width: 50rem;
`

const SubmitButton = styled.input`
  background-color: ${({ theme }) => theme.button.standard.background};
  color: ${({ theme }) => theme.button.standard.foreground};
  padding: 1.2rem 3rem;
  border-radius: 10px;
  border: none;
`
const mapDispatchToProps = dispatch => ({
  updateLoggedInState: () => dispatch(setLoggedIn())
})

export default connect(
  null,
  mapDispatchToProps
)(LoginComponent)

import { useState } from "react"
import gql from "graphql-tag"
import styled from "styled-components"
import { useMutation } from "@apollo/react-hooks"

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`

export default ({ props }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [login, { data }] = useMutation(LOGIN)
  const onSubmit = e => {
    e.preventDefault()
    login({ variables: { username, password } })
    setUsername("")
    setPassword("")
  }
  return (
    <LoginForm onSubmit={onSubmit}>
      <LoginInput
        type="text"
        name="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <LoginInput
        type="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <SubmitButton type="submit" value="Login" />
    </LoginForm>
  )
}

const LoginForm = styled.form`
  border: 1px solid #ccc;
  background-color: #707070;
  padding: 1rem;
`

const LoginInput = styled.input`
  border: 1px solid #333;
  background-color: white;
  font-family: "Raleway", sans-serif;
  font-size: 1.8rem;
`

const SubmitButton = styled.input`
  background-color: ${({ theme }) => theme.button.standard.background};
  color: ${({ theme }) => theme.button.standard.foreground};
  padding: 1.2rem 3rem;
  border-radius: 50%;
  border: none;
`

import React from "react"
import styled from "styled-components"
import Button from "@material-ui/core/Button"

const submitButton = ({ children, ...props }) => (
  <SubmitButton type="submit" {...props}>
    {props.children}
  </SubmitButton>
)

const SubmitButton = styled(Button)`
  cursor: pointer;
  display: block;
  background-color: ${({ theme }) => theme.button.standard.background};
  color: ${({ theme }) => theme.button.standard.foreground};
  padding: 1.2rem 3rem;
  border-radius: 10px;
  font-size: 1.6rem;
  font-weight: bold;
  border: none;
`

export default submitButton

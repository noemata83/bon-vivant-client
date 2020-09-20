import React from "react"
import styled from "styled-components"
import Button from "@material-ui/core/Button"

const StyledButton = styled(Button)`
  cursor: pointer;
  display: block;
  background-color: ${({ theme }) => theme.button.standard.background};
  color: ${({ theme }) => theme.button.standard.foreground};
  padding: 1.2rem 3rem;
  border-radius: 10px;
  border: none;
  margin: 1rem 0;
  font-size: 1.6rem;
  font-weight: bold;
  &:hover {
    background-color: ${({ theme }) => theme.button.standard.hover};
  }
`

export default StyledButton

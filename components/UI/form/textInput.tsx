import React from "react"
import styled from "styled-components"
import TextField from "@mui/material/TextField"

interface TextInputProps {
  value: string
  label: string
  update: Function
  type: string
  name: string
  placeholder: string
  style?: Object
  className?: string
  input?: any
}

const TextInputField = ({
  value,
  label,
  update,
  type,
  name,
  placeholder,
  style,
  className,
  input,
  ...props
}: TextInputProps) => {
  return update ? (
    <TextInput
      type={type ? type : "text"}
      value={value}
      label={label}
      variant="outlined"
      onChange={update}
      name={name}
      fullWidth
      placeholder={placeholder}
      style={style}
      className={className}
      {...props}
    />
  ) : (
    <TextInput
      label={label}
      variant="outlined"
      type={type ? type : "text"}
      name={name}
      fullWidth
      placeholder={placeholder}
      style={style}
      className={className}
      value={value}
      {...props}
    />
  )
}

export const TextInput = styled(TextField)`
  display: block;
  background-color: white;
  font-family: "Raleway", sans-serif;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  width: 100%;
  .MuiFormLabel-root {
    font-size: inherit;
  }
  .MuiInputBase-root {
    font-size: inherit;
  }

  &.name-input {
    width: 50rem;
  }
`
export default TextInputField

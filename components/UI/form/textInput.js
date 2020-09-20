import React from "react"
import styled from "styled-components"
import TextField from "@material-ui/core/TextField"

export default ({
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
}) => {
  return update ? (
    <TextInput
      type={type ? type : "text"}
      value={value}
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
  width: 30rem;
  .MuiFormLabel-root {
    font-size: inherit;
  }
  .MuiInputBase-root {
    font-size: inherit;
  }
`

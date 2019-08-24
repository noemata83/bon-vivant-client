import React from "react"
import styled from "styled-components"

export default ({
  value,
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
      placeholder={placeholder}
      style={style}
      className={className}
      {...props}
    />
  ) : (
    <TextInput
      type={type ? type : "text"}
      name={name}
      placeholder={placeholder}
      style={style}
      className={className}
      {...props}
    />
  )
}

export const TextInput = styled.input`
  display: block;
  border: 1px solid #333;
  background-color: white;
  font-family: "Raleway", sans-serif;
  padding: 0.5rem;
  width: 30rem;
  margin-bottom: 2rem;
  font-size: 1.8rem;
`

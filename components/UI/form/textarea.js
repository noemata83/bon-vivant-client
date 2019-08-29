import React from 'react'
import styled from 'styled-components'

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
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        value={value}
        onChange={update}
        name={name}
        placeholder={placeholder}
        style={style}
        className={className}
        {...props}
      />
    </div>
  ) : (
    <div>
      <Label htmlFor={name}>{label}:</Label>
      <Textarea
        type={type ? type : 'text'}
        name={name}
        placeholder={placeholder}
        style={style}
        className={className}
        {...props}
      />
    </div>
  )
}

const Textarea = styled.textarea`
  display: block;
  border: 1px solid #333;
  background-color: white;
  font-family: 'Raleway', sans-serif;
  padding: 0.5rem;
  width: 40rem;
  margin-bottom: 2rem;
  font-size: 1.8rem;
`

const Label = styled.label`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  display: block;
`

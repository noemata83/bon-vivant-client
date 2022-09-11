import React from "react"
import styled from "styled-components"
import TextField from "@mui/material/TextField"

const TextAreaInput = ({
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
      <Textarea
        value={value}
        label={label}
        onChange={update}
        name={name}
        placeholder={placeholder}
        multiline
        fullWidth
        minRows={5}
        variant="outlined"
        style={style}
        className={className}
        {...props}
      />
    </div>
  ) : (
    <div>
      <Textarea
        type={type ? type : "text"}
        name={name}
        label={label}
        multiline
        fullWidth
        variant="outlined"
        rows={5}
        placeholder={placeholder}
        style={style}
        className={className}
        value={value}
        {...props}
      />
    </div>
  )
}

const Textarea = styled(TextField)`
  display: block;
  background-color: white;
  font-family: "Raleway", sans-serif;
  width: 50rem;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  .MuiFormLabel-root {
    font-size: inherit;
  }
  .MuiInputBase-root {
    font-size: inherit;
  }
`
export default TextAreaInput

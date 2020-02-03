import React, { Fragment, useState } from "react"
import { Field, reduxForm } from "redux-form"
import TextInput from "../UI/form/textInput"
import Textarea from "../UI/form/textarea"
import Button from "../UI/buttons/Button"
import CreatableSelect from "react-select/creatable"
import { useQuery, useMutation } from "@apollo/react-hooks"
import styled from "styled-components"
import gql from "graphql-tag"

const renderInput = props => <TextInput {...props.input} {...props} />
const renderTextArea = props => <Textarea {...props.input} {...props} />

const ING_FAMILY_QUERY = gql`
  query {
    ingredientTypes {
      name
      id
    }
  }
`

const REGISTER_ING_FAMILY = gql`
  mutation createIngredienType($name: String!) {
    registerIngredientType(name: $name) {
      name
      id
    }
  }
`

const IngredientFamilySelect = props => {
  const [options, setOptions] = useState([{}])
  const [loaded, setLoaded] = useState(false)
  const { input } = props
  const { data, error, loading } = useQuery(ING_FAMILY_QUERY)
  if (error) return "Oops!"
  if (loading) return "..."
  const { ingredientTypes } = data
  if (!loaded) {
    setOptions(
      ingredientTypes.map(type => ({
        label: type.name,
        value: type.id
      }))
    )
    setLoaded(true)
  }
  // console.log(options)
  const [registerIngredientType, response] = useMutation(REGISTER_ING_FAMILY)

  const handleCreate = async inputValue => {
    const result = await registerIngredientType({
      variables: { name: inputValue }
    })
    if (result.data) {
      const { name, id } = result.data.registerIngredientType
      setOptions([
        ...options,
        {
          value: id,
          label: name
        }
      ])
    }
  }

  return (
    <CreatableSelect
      isClearable
      isMulti
      {...input}
      onCreateOption={handleCreate}
      onChange={option => input.onChange(option)}
      onBlur={() => input.onBlur(input.value)}
      options={options}
    />
  )
}

const registerIngredientForm = ({ initialValues, handleSubmit }) => (
  <div>
    <h2>Add a new Ingredient</h2>
    <form onSubmit={handleSubmit}>
      <Field component={renderInput} label="Name" name="name" />
      <Field
        component={renderTextArea}
        label="Description"
        name="description"
      />
      <Field component={IngredientFamilySelect} label="Family" name="family" />
      <input type="submit" value="Submit" />
    </form>
  </div>
)

export default reduxForm({
  form: `newIngredientForm`,
  enableReinitialize: true
})(registerIngredientForm)

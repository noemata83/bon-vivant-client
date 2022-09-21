import React, { Fragment, useState } from "react"
import { Form, Field } from "react-final-form"
import TextInput from "../UI/form/textInput"
import Textarea from "../UI/form/textarea"
import Button from "../UI/buttons/Button"
import CreatableSelect from "react-select/creatable"
import { useQuery, useMutation } from "@apollo/client"
import styled from "styled-components"
import gql from "graphql-tag"

const renderInput = (props) => <TextInput {...props.input} {...props} />
const renderTextArea = (props) => <Textarea {...props.input} {...props} />

const ING_FAMILY_QUERY = gql`
  query {
    ingredientFamilies {
      name
      id
    }
  }
`

const REGISTER_ING_FAMILY = gql`
  mutation createIngredienType($name: String!) {
    registerIngredientType(family: { name: $name }) {
      name
      id
    }
  }
`

const IngredientFamilySelect = (props) => {
  const [options, setOptions] = useState([{}])
  const [loaded, setLoaded] = useState(false)
  const { input } = props
  const { data, error, loading } = useQuery(ING_FAMILY_QUERY)
  if (error) return <>"Oops!"</>
  if (loading) return <>"..."</>
  const { ingredientFamilies } = data
  if (!loaded) {
    setOptions(
      ingredientFamilies.map((type) => ({
        label: type.name,
        value: type.id,
      }))
    )
    setLoaded(true)
  }
  const [registerIngredientType, response] = useMutation(REGISTER_ING_FAMILY)

  const handleCreate = async (inputValue) => {
    const result = await registerIngredientType({
      variables: { name: inputValue },
    })
    if (result.data) {
      const { name, id } = result.data.registerIngredientType
      setOptions([
        ...options,
        {
          value: id,
          label: name,
        },
      ])
    }
  }

  return (
    <CreatableSelect
      isClearable
      isMulti
      {...input}
      onCreateOption={handleCreate}
      onChange={(option) => input.onChange(option)}
      onBlur={() => input.onBlur(input.value)}
      options={options}
    />
  )
}

const registerIngredientForm = ({ initialValues, onSubmit }) => (
  <div>
    <h2>Add a new Ingredient</h2>
    <Form onSubmit={onSubmit} initialValues={initialValues} enableReinitialize>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field component={renderInput} label="Name" name="name" />
          <Field
            component={renderTextArea}
            label="Description"
            name="description"
          />
          <Field
            component={IngredientFamilySelect}
            label="Family"
            name="family"
          />
          <input type="submit" value="Submit" />
        </form>
      )}
    </Form>
  </div>
)

export default registerIngredientForm

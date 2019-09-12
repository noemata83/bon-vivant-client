import React, { Fragment } from 'react'
import { Field } from 'redux-form'
import TextInput from '../UI/form/textInput'
import Button from '../UI/buttons/Button'
import styled from 'styled-components'
import IngredientNameInput from '../UI/form/IngredientNameInput'

const generateInput = props => (
  <IngredientInput
    type={props.type}
    {...props.input}
    label={props.label}
    {...props}
  />
)

const renderIngredientNameInput = props => (
  <IngredientNameInput {...props.input} />
)

const ingredientForm = props => {
  const { fields } = props

  return (
    <div>
      <h3>Ingredients:</h3>
      {fields.map((ingredient, index) => {
        return (
          <IngredientRow key={`ingredient-${index}`}>
            <Field
              name={`${ingredient}.quantity`}
              key={`${ingredient}.quantity`}
              label="Qty"
              component={generateInput}
              type="number"
              step="0.25"
            />
            <Field
              name={`${ingredient}.measure`}
              key={`${ingredient}.measure`}
              component={generateInput}
              label="Measure"
              type="text"
            />
            <Field
              name={`${ingredient}.name`}
              key={`${ingredient}.name`}
              component={renderIngredientNameInput}
              label="Name"
            />
            <div>
              <Button type="button" onClick={() => fields.remove(index)}>
                -
              </Button>
            </div>
          </IngredientRow>
        )
      })}
      <div>
        <Button
          style={{ marginLeft: 'auto' }}
          type="button"
          onClick={() => fields.push({})}
        >
          Add an Ingredient
        </Button>
      </div>
    </div>
  )
}

export default ingredientForm

const IngredientInput = styled(TextInput)`
  width: 30rem;
`
const IngredientRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

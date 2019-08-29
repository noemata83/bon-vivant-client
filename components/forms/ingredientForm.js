import React, { Fragment } from 'react'
import { Field } from 'redux-form'
import TextInput from '../UI/form/textInput'
import Button from '../UI/buttons/Button'
import styled from 'styled-components'

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
              component={props => (
                <IngredientInput {...props.input} label="Quantity" />
              )}
              type="text"
            />
            <Field
              name={`${ingredient}.measure`}
              key={`${ingredient}.measure`}
              component={props => (
                <IngredientInput {...props.input} label="Measure" />
              )}
              label="Measure"
            />
            <Field
              name={`${ingredient}.name`}
              key={`${ingredient}.name`}
              component={props => (
                <IngredientInput {...props.input} label="Name" />
              )}
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

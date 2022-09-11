import React, { Fragment } from "react"
import { Field } from "react-final-form"
import TextInput from "../UI/form/textInput"
import Button from "../UI/buttons/Button"
import styled from "styled-components"
import IngredientNameInput from "../UI/form/IngredientNameInput"
import IconButton from "@mui/material/IconButton"
import Remove from "@mui/icons-material/Remove"

const generateInput = (props) => (
  <IngredientInput
    type={props.type}
    {...props.input}
    label={props.label}
    {...props}
  />
)

const renderIngredientNameInput = (props) => <IngredientNameInput {...props} />

const ingredientForm = (props) => {
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
              name={`${ingredient}.ingredient`}
              key={`${ingredient}.ingredient`}
              component={renderIngredientNameInput}
              label="Name"
            />
            <div
              style={{
                marginBottom: "2rem",
              }}
            >
              <IconButton
                type="button"
                size="medium"
                onClick={() => fields.remove(index)}
              >
                <Remove color="primary" fontSize="large" />
              </IconButton>
            </div>
          </IngredientRow>
        )
      })}
      <div>
        <Button
          style={{ marginLeft: "auto" }}
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
  flex-basis: 25%;
  flex-grow: 1;
  margin-right: 2rem;
`
const IngredientRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

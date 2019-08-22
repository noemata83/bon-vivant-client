import React, { Fragment } from "react"
import { Field } from "redux-form"
import TextInput from "../UI/form/textInput"

const ingredientForm = props => {
  const { fields } = props

  return (
    <div>
      <h3>Ingredients:</h3>
      {fields.map((ingredient, index) => {
        console.log(ingredient)
        return (
          <Fragment key={`ingredient-${index}`}>
            <Field
              name={`${ingredient}.quantity`}
              key={`${ingredient}.quantity`}
              label="Qty"
              component="input"
              type="text"
            />
            <Field
              name={`${ingredient}.measure`}
              key={`${ingredient}.measure`}
              component="input"
              label="Measure"
            />
            <Field
              name={`${ingredient}.name`}
              key={`${ingredient}.name`}
              component="input"
              label="Name"
            />
            <div>
              <button type="button" onClick={() => fields.remove(index)}>
                -
              </button>
            </div>
          </Fragment>
        )
      })}
      <div>
        <button type="button" onClick={() => fields.push({})}>
          Add an Ingredient
        </button>
      </div>
    </div>
  )
}

export default ingredientForm

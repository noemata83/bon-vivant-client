import React from "react"
import { Field, FieldArray, reduxForm } from "redux-form"
import TextInput from "../UI/form/textInput"
import IngredientForm from "./ingredientForm"
import ingredientForm from "./ingredientForm"

const cocktailForm = ({ initialValues, handleSubmit }) => {
  return (
    <div>
      <h2>
        {initialValues ? "Edit Cocktail Spec" : "Create a New Cocktail Spec"}
      </h2>
      <form onSubmit={handleSubmit(values => console.log(values))}>
        <Field component="input" label="Name" name="name" />
        <Field component="textarea" label="Description" name="description" />
        <FieldArray name="ingredients" component={ingredientForm} />
        <Field component="textarea" label="Directions:" name="directions" />
        <button
          type="button"
          onClick={handleSubmit(values => console.log(values))}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default reduxForm({
  form: `cocktailForm`,
  enableReinitialize: true
})(cocktailForm)

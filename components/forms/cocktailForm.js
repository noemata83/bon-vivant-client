import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import TextInput from '../UI/form/textInput'
import Textarea from '../UI/form/textarea'
import SubmitButton from '../UI/form/submitButton'
import ingredientForm from './ingredientForm'

const cocktailForm = ({ initialValues, handleSubmit }) => {
  return (
    <div>
      <h2>
        {initialValues ? 'Edit Cocktail Spec' : 'Create a New Cocktail Spec'}
      </h2>
      <form onSubmit={handleSubmit}>
        <Field
          component={props => <TextInput {...props.input} label="Name" />}
          label="Name"
          name="name"
        />
        <Field
          component={props => <Textarea {...props.input} label="Description" />}
          label="Description"
          name="description"
        />
        <FieldArray name="ingredients" component={ingredientForm} />
        <Field
          component={props => (
            <Textarea {...props.input} label="Directions: " />
          )}
          label="Directions:"
          name="directions"
        />
        <SubmitButton type="submit" onClick={handleSubmit} value="Submit" />
      </form>
    </div>
  )
}

export default reduxForm({
  form: `cocktailForm`,
  enableReinitialize: true
})(cocktailForm)

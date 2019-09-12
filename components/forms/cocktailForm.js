import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import TextInput from '../UI/form/textInput'
import Textarea from '../UI/form/textarea'
import SubmitButton from '../UI/form/submitButton'
import ingredientForm from './ingredientForm'

const renderInput = props => <TextInput {...props.input} {...props} />
const renderTextArea = props => <Textarea {...props.input} {...props} />

const cocktailForm = ({ initialValues, handleSubmit }) => {
  return (
    <div>
      <h2>
        {initialValues ? 'Edit Cocktail Spec' : 'Create a New Cocktail Spec'}
      </h2>
      <form onSubmit={handleSubmit}>
        <Field component={renderInput} label="Name" name="name" />
        <Field
          component={renderTextArea}
          label="Description"
          name="description"
        />
        <FieldArray name="ingredients" component={ingredientForm} />
        <Field
          component={renderTextArea}
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

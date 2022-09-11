import React from "react"
import { Form, Field } from "react-final-form"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"
import TextInput from "../UI/form/textInput"
import Textarea from "../UI/form/textarea"
import SubmitButton from "../UI/buttons/Button"
import ingredientForm from "./ingredientForm"

const renderInput = (props) => <TextInput {...props.input} {...props} />
const renderTextArea = (props) => <Textarea {...props.input} {...props} />

const cocktailForm = ({ initialValues, onSubmit }) => {
  return (
    <div>
      <h2>
        {initialValues ? "Edit Cocktail Spec" : "Create a New Cocktail Spec"}
      </h2>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
        mutators={{ ...arrayMutators }}
      >
        {({ values, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              component={renderInput}
              label="Name"
              name="name"
              className="name-input"
            />
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
            <SubmitButton type="submit">Submit</SubmitButton>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      </Form>
    </div>
  )
}

export default cocktailForm

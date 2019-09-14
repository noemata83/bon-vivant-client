import React from 'react'
import Page from '../../layouts/main'
import IngredientForm from '../../components/forms/registerIngredient'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const newIngredient = props => {
  const handleSubmit = values => {
    // values.preventDefault()
    console.log(values)

    // try {
    //   addSpec({ variables: parsedValues })
    // } catch (err) {
    //   console.log(err)
    // }
  }
  return (
    <Page>
      <main>
        <IngredientForm onSubmit={handleSubmit} />
      </main>
    </Page>
  )
}

export default newIngredient

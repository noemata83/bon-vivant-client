import React from 'react'
import Router from 'next/router'
import Page from '../../layouts/main'
import IngredientForm from '../../components/forms/registerIngredient'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const ADD_INGREDIENT = gql`
  mutation createIngredient(
    $name: String!
    $description: String
    $family: [String]!
  ) {
    addIngredient(name: $name, description: $description, family: $family) {
      name
      id
      description
    }
  }
`

const newIngredient = props => {
  const [addIngredient, { error }] = useMutation(ADD_INGREDIENT)
  const handleSubmit = values => {
    const parsedValues = {
      ...values,
      family: [values.family.value]
    }
    try {
      addIngredient({ variables: parsedValues })
      Router.push('/ingredients')
    } catch (err) {
      console.log(err)
    }
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

import React from 'react'
import Page from '../../layouts/main'
import CocktailForm from '../../components/forms/cocktailForm'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const ADD_SPEC = gql`
  mutation addSpec(
    $name: String!
    $description: String
    $ingredients: [Spec_Ingredient_Input]!
    $directions: String!
  ) {
    createSpec(
      name: $name
      description: $description
      ingredients: $ingredients
      directions: $directions
    ) {
      name
      id
    }
  }
`

const NewCocktail = ({ isLoggedIn }) => {
  const [addSpec, { error, loading, data }] = useMutation(ADD_SPEC, {
    onError: error => {
      console.log(error)
    }
  })

  const handleSubmit = values => {
    // values.preventDefault()
    console.log(values)
    const parsedValues = {
      ...values,
      ingredients: values.ingredients.map(ingredient => ({
        ...ingredient,
        quantity: +ingredient.quantity
      }))
    }
    console.log(parsedValues)
    try {
      addSpec({ variables: parsedValues })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Page>
      <main>
        <CocktailForm onSubmit={handleSubmit} />
        {error && <span>{error.message}</span>}
      </main>
    </Page>
  )
}

export default NewCocktail

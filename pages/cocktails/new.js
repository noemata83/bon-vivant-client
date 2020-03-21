import React from "react"
import Page from "../../layouts/main"
import CocktailForm from "../../components/forms/cocktailForm"
import { useMutation } from "@apollo/react-hooks"
import { ADD_SPEC } from "../../queries/"

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
      spec: {
        ...values,
        ingredients: values.ingredients.map(ingredient => ({
          ...ingredient,
          quantity: +ingredient.quantity
        }))
      }
    }
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

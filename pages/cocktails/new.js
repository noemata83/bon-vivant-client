import React from "react"
import Page from "../../layouts/main"
import CocktailForm from "../../components/forms/cocktailForm"
import { useMutation } from "@apollo/client"
import { ADD_SPEC } from "../../queries/"
import Router from "next/router"

const NewCocktail = ({ isLoggedIn }) => {
  const [addSpec, { error, loading, data }] = useMutation(ADD_SPEC, {
    onError: (error) => {
      console.log(error)
    },
  })

  const handleSubmit = (values) => {
    // values.preventDefault()
    const parsedValues = {
      spec: {
        ...values,
        ingredients: values.ingredients.map((ingredient) => ({
          ...ingredient,
          quantity: +ingredient.quantity,
        })),
      },
    }
    try {
      addSpec({ variables: parsedValues })
      Router.push("/")
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

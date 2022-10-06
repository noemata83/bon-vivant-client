import React from "react"
import Page from "../../src/client/components/layouts/main"
import CocktailForm from "../../src/client/components/forms/cocktailForm"
import { useMutation } from "@apollo/client"
import { ADD_SPEC } from "../../src/client/components/queries"
import Router from "next/router"

const NewCocktail = ({ isLoggedIn }) => {
  const [addSpec, { error, loading, data }] = useMutation(ADD_SPEC, {
    onError: (error) => {
      console.error(error)
    },
  })

  const handleSubmit = (values) => {
    const parsedValues = {
      spec: {
        ...values,
        ingredients: values.ingredients.map((si) => ({
          ...si,
          name: si.ingredient.name,
          quantity: +si.quantity,
          ingredient: undefined,
        })),
      },
    }
    try {
      addSpec({ variables: parsedValues })
      Router.push("/")
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Page>
      <CocktailForm onSubmit={handleSubmit} initialValues={null} />
      {error && <span>{error.message}</span>}
    </Page>
  )
}

export default NewCocktail

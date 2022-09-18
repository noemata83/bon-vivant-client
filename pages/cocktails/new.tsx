import React from "react"
import Page from "../../layouts/main"
import CocktailForm from "../../components/forms/cocktailForm"
import { useMutation } from "@apollo/client"
import { ADD_SPEC } from "../../queries"
import Router from "next/router"

const NewCocktail = ({ isLoggedIn }) => {
  const [addSpec, { error, loading, data }] = useMutation(ADD_SPEC, {
    onError: (error) => {
      console.log(error)
    },
  })

  const handleSubmit = (values) => {
    console.log(values)
    const parsedValues = {
      spec: {
        ...values,
        ingredients: values.ingredients.map((ingredient) => ({
          ...ingredient,
          name: ingredient.name.name,
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
      <CocktailForm onSubmit={handleSubmit} initialValues={null} />
      {error && <span>{error.message}</span>}
    </Page>
  )
}

export default NewCocktail

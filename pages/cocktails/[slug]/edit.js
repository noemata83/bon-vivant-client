import React from "react"
import Router, { useRouter } from "next/router"
import Page from "../../../layouts/main"
import CocktailForm from "../../../components/forms/cocktailForm"
import { useMutation, useQuery } from "@apollo/client"
import { GET_SPEC, EDIT_SPEC } from "../../../queries"
import Head from "next/head"

const editIngredient = (props) => {
  const router = useRouter()
  const { data, error, loading } = useQuery(GET_SPEC, {
    variables: {
      slug: router.query.slug,
    },
  })
  const [editSpec, { error: mutationError }] = useMutation(EDIT_SPEC)
  if (loading) return "Loading..."
  if (error) return `Woops! An Error: ${error.message}`
  const spec = {
    ...data.spec,
    ingredients: data.spec.ingredients.map((ing) => {
      return {
        ...ing,
        name: ing.ingredient.name,
      }
    }),
  }
  const handleSubmit = (values) => {
    const parsedValues = {
      ...values,
      ingredients: values.ingredients.map((ingredient) => ({
        ...ingredient,
        name: ingredient.name,
        quantity: +ingredient.quantity,
        __typename: undefined,
        ingredient: undefined,
      })),
    }

    try {
      editSpec({ variables: { ...parsedValues, id: data.spec.id } })
      Router.push("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Page>
      <Head>
        <title>Bon Vivant Cocktails: Edit {spec.name}</title>
      </Head>
      <main>
        <CocktailForm onSubmit={handleSubmit} initialValues={spec} />
      </main>
    </Page>
  )
}

export default editIngredient

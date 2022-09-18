import React from "react"
import Router, { useRouter } from "next/router"
import Page from "../../../layouts/main"
import CocktailForm from "../../../components/forms/cocktailForm"
import { useMutation, useQuery } from "@apollo/client"
import { GET_SPEC, EDIT_SPEC, GET_SPECS } from "../../../queries"
import Head from "next/head"

const editSpec = (props) => {
  const router = useRouter()
  const { data, error, loading } = useQuery(GET_SPEC, {
    variables: {
      slug: router.query.slug,
    },
  })
  const [editSpec, { error: mutationError }] = useMutation(EDIT_SPEC, {
    refetchQueries: [{ query: GET_SPEC }, { query: GET_SPECS }],
  })
  if (loading) return "Loading..."
  if (error) return `Woops! An Error: ${error.message}`
  const spec = {
    ...data.spec,
  }
  const handleSubmit = (values) => {
    const parsedValues = {
      ...values,
      ingredients: values.ingredients.map((ingredient) => ({
        name: ingredient.ingredient.name,
        slug: ingredient.ingredient.slug,
        quantity: +ingredient.quantity,
        ...ingredient,
        ingredient: undefined,
        __typename: undefined,
      })),
    }

    debugger
    console.log({ parsedValues })

    try {
      editSpec({ variables: { ...parsedValues, id: data.spec.id } })
      Router.push("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Page isLoggedIn={props.isLoggedIn}>
      <Head>
        <title>Bon Vivant Cocktails: Edit {spec.name}</title>
      </Head>
      <main>
        <CocktailForm onSubmit={handleSubmit} initialValues={spec} />
      </main>
    </Page>
  )
}

export default editSpec

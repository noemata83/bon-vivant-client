import React from "react"
import Router, { useRouter } from "next/router"
import Page from "../../../layouts/main"
import IngredientForm from "../../../components/forms/registerIngredient"
import { useMutation, useQuery } from "@apollo/client"
import gql from "graphql-tag"

const ADD_INGREDIENT = gql`
  mutation editIngredient(
    $id: String!
    $name: String!
    $description: String
    $family: [String]
  ) {
    editIngredient(
      id: $id
      ingredient: { name: $name, description: $description, family: $family }
    ) {
      name
      id
      description
    }
  }
`

const GET_INGREDIENT = gql`
  query findIngredient($slug: String!) {
    ingredient(slug: $slug) {
      name
      slug
      id
      family {
        name
        id
      }
      description
    }
  }
`

const editIngredient = (props) => {
  const router = useRouter()
  const { data, error, loading } = useQuery(GET_INGREDIENT, {
    variables: {
      slug: router.query.slug,
    },
  })
  const [editIngredient, { error: mutationError }] = useMutation(ADD_INGREDIENT)
  if (loading) return "Loading..."
  if (error) return `Woops! An Error: ${error.message}`
  const ingredient = {
    ...data.ingredient,
    family: data.ingredient.family.map((fam) => ({
      value: fam.id,
      label: fam.name,
    })),
  }
  const handleSubmit = (values) => {
    const parsedValues = {
      ...values,
      family: values.family.map((fam) => fam.value),
    }
    try {
      editIngredient({ variables: { ...parsedValues, id: data.ingredient.id } })
      Router.push("/ingredients")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Page>
      <main>
        <IngredientForm onSubmit={handleSubmit} initialValues={ingredient} />
      </main>
    </Page>
  )
}

export default editIngredient

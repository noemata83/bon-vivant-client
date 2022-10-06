import React from "react"
import Router from "next/router"
import Page from "../../src/client/components/layouts/main"
import IngredientForm from "../../src/client/components/forms/registerIngredient"
import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { GET_SPEC, GET_SPECS } from "../../src/client/components/queries"

const ADD_INGREDIENT = gql`
  mutation createIngredient(
    $name: String!
    $description: String
    $family: [String]!
  ) {
    addIngredient(
      ingredient: { name: $name, description: $description, family: $family }
    ) {
      name
      id
      description
    }
  }
`

const newIngredient = (props) => {
  const [addIngredient, { error }] = useMutation(ADD_INGREDIENT, {
    refetchQueries: [{ query: GET_SPEC }, { query: GET_SPECS }],
  })
  const handleSubmit = (values) => {
    const parsedValues = {
      ...values,
      family: values.family.map((fam) => fam.value),
    }
    try {
      addIngredient({ variables: parsedValues })
      Router.push("/ingredients")
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Page>
      <main>
        <IngredientForm onSubmit={handleSubmit} initialValues={null} />
      </main>
    </Page>
  )
}

export default newIngredient

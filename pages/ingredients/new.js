import React from "react"
import Router from "next/router"
import Page from "../../layouts/main"
import IngredientForm from "../../components/forms/registerIngredient"
import { useMutation } from "@apollo/client"
import gql from "graphql-tag"

const ADD_INGREDIENT = gql`
  mutation createIngredient(
    $name: String!
    $description: String
    $family: [Int]!
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
  const [addIngredient, { error }] = useMutation(ADD_INGREDIENT)
  const handleSubmit = (values) => {
    const parsedValues = {
      ...values,
      family: values.family.map((fam) => fam.value),
    }
    console.log(parsedValues)
    try {
      addIngredient({ variables: parsedValues })
      Router.push("/ingredients")
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

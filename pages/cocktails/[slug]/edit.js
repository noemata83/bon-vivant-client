import React from 'react'
import Router, { useRouter } from 'next/router'
import Page from '../../../layouts/main'
import CocktailForm from '../../../components/forms/cocktailForm'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { GET_SPEC, EDIT_SPEC } from '../../../queries'

const editIngredient = props => {
  const router = useRouter()
  const { data, error, loading } = useQuery(GET_SPEC, {
    variables: {
      slug: router.query.slug
    }
  })
  const [editSpec, { error: mutationError }] = useMutation(EDIT_SPEC)
  if (loading) return 'Loading...'
  if (error) return `Woops! An Error: ${error.message}`
  const spec = {
    ...data.spec,
    ingredients: data.spec.ingredients.map(ing => {
      console.log(ing)
      return {
        ...ing,
        name: ing.ingredient.name
      }
    })
  }
  const handleSubmit = values => {
    const parsedValues = {
      ...values,
      ingredients: values.ingredients.map(ingredient => ({
        ...ingredient,
        name: ingredient.ingredient.name,
        quantity: +ingredient.quantity,
        __typename: undefined,
        ingredient: undefined
      }))
    }
    console.log({ ...parsedValues, id: data.spec.id })
    try {
      editSpec({ variables: { ...parsedValues, id: data.spec.id } })
      // Router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Page>
      <main>
        <CocktailForm onSubmit={handleSubmit} initialValues={spec} />
      </main>
    </Page>
  )
}

export default editIngredient

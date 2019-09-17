import React from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import gql from 'graphql-tag'

const INGREDIENT_LIST_QUERY = gql`
  query {
    ingredientTypes {
      name
      id
    }
    ingredients {
      name
      slug
      id
      family {
        name
        id
      }
    }
  }
`

const sortIngredients = (ingredients, ingredientTypes) => {
  return ingredientTypes.reduce((acc, type) => {
    return {
      ...acc,
      [type.name]: ingredients.filter(ingredient => {
        const result = ingredient.family.find(fam => fam.id == type.id)
        return Boolean(result)
      })
    }
  }, {})
}

export default ({ props }) => {
  const { loading, error, data } = useQuery(INGREDIENT_LIST_QUERY)
  if (loading) return 'Loading ...'
  if (error) return `Oh noes! An error! ${error}`
  const { ingredients, ingredientTypes } = data
  const sortedIngredients = sortIngredients(ingredients, ingredientTypes)
  return (
    <div>
      <ul>
        {Object.keys(sortedIngredients).map(type => {
          if (sortedIngredients[type].length === 0) {
            return
          }
          return (
            <li key={type}>
              <TypeHeader>{type}</TypeHeader>
              <ListOfIngredientsByType>
                {sortedIngredients[type].map(ingredient => (
                  <IndividualIngredient key={ingredient.name}>
                    <Link
                      href="/ingredients/[slug]"
                      as={`/ingredients/${ingredient.slug}`}
                    >
                      <a>{ingredient.name}</a>
                    </Link>
                  </IndividualIngredient>
                ))}
              </ListOfIngredientsByType>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const TypeHeader = styled.h3`
  margin-top: 3rem;
  margin-bottom: 1rem;
`

const ListOfIngredientsByType = styled.ul`
  padding-left: 2rem;
`

const IndividualIngredient = styled.li`
  margin-bottom: 0.5rem;
`

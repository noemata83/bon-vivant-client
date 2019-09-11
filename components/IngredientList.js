import React from 'react'
import { useQuery } from '@apollo/react-hooks'
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
      Hi
      <ul>
        {Object.keys(sortedIngredients).map(type => {
          if (sortedIngredients[type].length === 0) {
            console.log('No results for ', type)
            return
          }
          return (
            <li key={type}>
              <strong>{type}</strong>
              <ul>
                {sortedIngredients[type].map(ingredient => (
                  <li key={ingredient.name}>{ingredient.name}</li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

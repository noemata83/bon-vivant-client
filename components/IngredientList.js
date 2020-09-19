import React from "react"
import Link from "next/link"
import { useQuery } from "@apollo/client"
import styled from "styled-components"

const sortIngredients = (ingredients, ingredientFamilies) => {
  return ingredientFamilies.reduce((acc, type) => {
    return {
      ...acc,
      [type.name]: ingredients.filter((ingredient) => {
        const result = ingredient.family.find((fam) => fam.id == type.id)
        return Boolean(result)
      }),
    }
  }, {})
}

export default ({ query }) => {
  const { loading, error, data } = useQuery(query)
  if (loading) return "Loading ..."
  if (error) return `Oh noes! An error! ${error}`
  const { ingredients, ingredientFamilies } = data
  const sortedIngredients = sortIngredients(ingredients, ingredientFamilies)
  return (
    <div>
      <ul>
        {Object.keys(sortedIngredients).map((type) => {
          if (sortedIngredients[type].length === 0) {
            return
          }
          return (
            <li key={type}>
              <TypeHeader>{type}</TypeHeader>
              <ListOfIngredientsByType>
                {sortedIngredients[type].map((ingredient) => (
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

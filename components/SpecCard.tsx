import React from "react"
import Link from "next/link"
import styled from "styled-components"
import theme from "../global/theme"

const SpecCard = ({ spec }) => {
  const { image, name, slug, ingredients } = spec
  return (
    <CardContainer>
      <Card>
        <CardImageContainer>
          <CardImage src={image} />
        </CardImageContainer>
        <Link href="/cocktails/[slug]" as={`/cocktails/${slug}`} legacyBehavior>
          <SpecLink>
            <CardTitle>{name}</CardTitle>
            <IngredientList>
              {spec.ingredients.slice(0, 4).map(ingredient => (
                <IngredientItem key={ingredient.ingredient.name}>
                  {ingredient.ingredient.name}
                </IngredientItem>
              ))}
            </IngredientList>
          </SpecLink>
        </Link>
      </Card>
    </CardContainer>
  );
};

export default SpecCard;

const CardContainer = styled.div`
  height: 45rem;
  position: relative;
  width: 100%;
  max-width: 32rem;
`

const Card = styled.div`
  position: relative;
  transform: translateY(7rem);
  height: calc(100% - 7rem);
  padding: 12rem 2.5rem 2.5rem;
  background-color: white;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25), 4px 4px 20px rgba(0, 0, 0, 0.25);
`

const CardTitle = styled.h2`
  font-size: 2.8rem;
  font-family: ${theme.type.heading.fontFamily};
  text-align: center;
  margin-bottom: 3rem;
`

const IngredientList = styled.ul`
  display: block;
  list-style: none;
  text-align: center;
  margin: 0;
  padding: 0;
`

const IngredientItem = styled.li`
  text-transform: lowercase;
  font-size: 2rem;
  margin-bottom: 1rem;
  font-family: ${theme.type.heading.fontFamily};
`

const CardImageContainer = styled.div`
  position: absolute;
  z-index: 1;
  background-color: #999;
  border: 1px solid white;
  height: 17rem;
  width: 17rem;
  border-radius: 50%;
  overflow: hidden;
  top: 0;
  left: 50%;
  transform: translate(-50%, -30%);
`

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const SpecLink = styled.a`
  cursor: pointer;
`

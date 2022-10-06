import { css } from "styled-components"

type MediaDef = {
  largeDesktop?: number
  desktop?: number
  landscapeTablet?: number
  tablet?: number
  phone?: number
  smallPhone?: number
}

const sizes: MediaDef = {
  largeDesktop: 1800,
  desktop: 1260,
  landscapeTablet: 980,
  tablet: 576,
  phone: 360,
  smallPhone: 320,
}

type MediaQuery = {
  [Property in keyof MediaDef]: Function
}

// Iterate through the sizes and create a media template
const media: MediaQuery = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})

export default media

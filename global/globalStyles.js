import { createGlobalStyle } from "styled-components"
import theme from "./theme"
import media from "./mediaTemplates"

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 50%;
    ${media.landscapeTablet`
      font-size: 56.25%;
    `};
    ${media.desktop`
      font-size: 62.5%;
    `};
    margin: 0;
    padding: 0;
  }
  body {
    padding: 0;
    margin: 0;
    min-height: 100vh;
    background: ${theme.color.background};
    font-size: ${theme.type.body.fontSize};
    font-family: ${theme.type.body.fontFamily};
  }

  h1 {
    font-family: ${theme.type.heading.fontFamily};
    font-size: ${theme.type.heading.h1.fontSize};
    ${media.landscapeTablet`
      font-size: ${theme.type.heading.h1.fullFontSize};
    `}; 
    margin: ${theme.type.heading.h1.margin};
    padding: ${theme.type.heading.h1.padding};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`

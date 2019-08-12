import { css } from 'styled-components'
const sizes = {
    largeDesktop: 1800,
    desktop: 1260,
    landscapeTablet: 980,
    tablet: 576,
    phone: 360,
    smallPhone: 320
  }
  
  // Iterate through the sizes and create a media template
  const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (min-width: ${sizes[label] / 16}em) {
        ${css(...args)}
      }
    `
  
    return acc
  }, {});
  
  export default media;

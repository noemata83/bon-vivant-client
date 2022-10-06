import styled from "styled-components"
import Container from "../../layout/container"

const FooterComponent = (props) => (
  <Footer>
    <Container>
      Developed by the Lazy Libertine, &copy;
      {new Date(Date.now()).getFullYear()}
    </Container>
  </Footer>
)

export default FooterComponent

const Footer = styled.footer`
  padding: 2rem;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.background};
  display: flex;
  font-size: 1.6rem;
`

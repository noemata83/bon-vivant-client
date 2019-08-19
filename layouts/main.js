import Header from "./header/header"
import Footer from "./footer/footer"
import styled from "styled-components"

export default ({ children, isLoggedIn }) => (
  <Main>
    <Header isLoggedIn={isLoggedIn} />
    <Container>{children}</Container>
    <Footer />
  </Main>
)

const Main = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  max-width: 120rem;
  width: 90%;
  margin: 0 auto 2rem;
  flex-grow: 1;
`

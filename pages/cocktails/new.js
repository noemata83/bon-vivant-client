import React from "react"
import Page from "../../layouts/main"
import CocktailForm from "../../components/forms/cocktailForm"

const NewCocktail = ({ isLoggedIn }) => (
  <Page>
    <main>
      <CocktailForm />
    </main>
  </Page>
)

export default NewCocktail

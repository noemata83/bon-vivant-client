import { useRouter } from "next/router"
import Page from "../../src/client/components/layouts/main"
import Ingredient from "../../src/client/components/Ingredient"

const IngredientDetail = () => {
  const router = useRouter()

  return (
    <Page>
      <Ingredient slug={router.query.slug} />
    </Page>
  )
}

export default IngredientDetail

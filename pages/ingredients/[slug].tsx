import { useRouter } from "next/router"
import Page from "../../layouts/main"
import Ingredient from "../../components/Ingredient"

const IngredientDetail = () => {
  const router = useRouter()

  return (
    <Page>
      <Ingredient slug={router.query.slug} />
    </Page>
  )
}

export default IngredientDetail

import Sequelize from "sequelize"
import sequelize from "../../../lib/sequelize.mjs"
import slugify from "slugify"
// import Ingredient from "./Ingredient"
const { Model } = Sequelize

class IngredientFamily extends Model {}

export const initFamilies = () => {
  IngredientFamily.init(
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      }
    },
    {
      hooks: {
        beforeCreate: (family, options) => {
          if (!family.slug) {
            const slug = slugify(family.name.toLowerCase())
            family.slug = slug
          }
        }
      },
      sequelize,
      modelName: "ingredientFamilies"
    }
  )
  return IngredientFamily
}

export default IngredientFamily

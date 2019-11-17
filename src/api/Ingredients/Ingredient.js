import Sequelize from "sequelize"
import sequelize from "../../../lib/sequelize"
import IngredientFamily from "./IngredientFamily"
const { Model } = Sequelize

class Ingredient extends Model {}
export class SpecIngredient extends Model {}
export class IngFamily extends Model {}

export const initIngredient = () => {
  Ingredient.init(
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
        beforeCreate: (ingredient, options) => {
          if (!ingredient.slug) {
            const slug = slugify(ingredient.name.toLowerCase())
            ingredient.slug = slug
          }
        }
      },
      sequelize,
      modelName: "ingredients"
    }
  )

  IngFamily.init({}, { sequelize, modelName: "ingFamilies" })

  SpecIngredient.init(
    {
      quantity: {
        type: Sequelize.FLOAT
      },
      measure: {
        type: Sequelize.INTEGER
      },
      canSub: {
        type: Sequelize.BOOLEAN
      },
      subWith: {
        type: Sequelize.STRING
      }
    },
    {
      sequelize,
      modelName: "specIngredients"
    }
  )
}

export default Ingredient

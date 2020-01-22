import Sequelize from "sequelize"
import sequelize from "../../../lib/sequelize.mjs"
import IngredientFamily from "./IngredientFamily.mjs"
import slugify from "slugify"
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
  IngFamily.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ingredientId: {
        type: Sequelize.INTEGER
      },
      familyId: {
        type: Sequelize.INTEGER
      }
    },
    {
      sequelize,
      modelName: "ingFamilies"
    }
  )
  SpecIngredient.init(
    {
      quantity: {
        type: Sequelize.FLOAT
      },
      measure: {
        type: Sequelize.ENUM([
          "OZ",
          "ML",
          "TSP",
          "TBSP",
          "DS",
          "DR",
          "PN",
          "BSP",
          "SPL",
          "RINSE",
          "TWIST",
          "SPG",
          "SLI",
          "WDG",
          "CUBE"
        ])
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

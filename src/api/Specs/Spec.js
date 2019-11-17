import Sequelize from "sequelize"
import sequelize from "../../../lib/sequelize"
import slugify from "slugify"
import Ingredient from "../Ingredients/Ingredient"
import Review from "./Review"
const { Model } = Sequelize

class Spec extends Model {}

export const initSpecs = () => {
  Spec.init(
    {
      createdAt: {
        type: Sequelize.DATE
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      directions: {
        type: Sequelize.TEXT
      }
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (family, options) => {
          if (!family.slug) {
            const slug = slugify(family.name.toLowerCase())
            family.slug = slug
          }
        }
      },
      modelName: "specs"
    }
  )
}

export default Spec

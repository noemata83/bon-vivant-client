import Sequelize from "sequelize"
import sequelize from "../../../lib/sequelize.mjs"
import slugify from "slugify"
import Review from "./Review.mjs"
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
      modelName: "spec"
    }
  )
}

export default Spec
import Sequelize from "sequelize"
import sequelize from "../../../lib/sequelize.mjs"
import User from "../Users/User.mjs"
const { Model } = Sequelize

class Review extends Model {}
export const initReview = () => {
  Review.init(
    {
      rating: {
        type: Sequelize.FLOAT
      },
      posted: {
        type: Sequelize.DATE,
        defaultValue: Date.now()
      },
      comment: {
        type: Sequelize.TEXT
      }
    },
    {
      sequelize,
      modelName: "reviews"
    }
  )

  Review.hasOne(User, { as: "author" })
}

export default Review

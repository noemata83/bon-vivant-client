import Sequelize from "sequelize"
import sequelize from "../../../lib/sequelize"
import User from "../Users/User"
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

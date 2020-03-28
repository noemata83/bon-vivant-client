import { Review, User } from "../models"

export const addReview = async (review, specId, userId) => {
  const newReview = await Review.create({
    ...review,
    SpecId: specId,
    UserId: userId
  })
  const theReview = await Review.findOne({
    where: {
      id: newReview.id
    },
    include: [
      {
        model: User,
        as: "User",
        attributes: ["id", "username", "email"]
      }
    ]
  })
  return theReview
}

export const editReview = async (id, review) => {
  await Review.update(review, { where: { id } })
  return Review.findOne({
    where: { id },
    include: [
      {
        model: User,
        attributes: ["id", "username", "email"]
      }
    ]
  })
}

export const deleteReview = async id => {
  const reviewToDelete = await Review.findByPk(id)
  await Review.destroy({ where: { id } })
  return reviewToDelete
}

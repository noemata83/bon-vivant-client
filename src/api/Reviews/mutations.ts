import { addReview, editReview, deleteReview } from "./controller"

export default {
  Mutation: {
    addReview: async (parentValue, args, { user }) => {
      const { review, spec } = args
      const result = await addReview(review, spec, user)
      return result
    },
    editReview: async (parentValue, args, { user }) => {
      const { id, review } = args
      return editReview(id, review)
    },
    deleteReview: async (parentValue, args, { user }) => {
      const { id } = args
      return deleteReview(id)
    }
  }
}

import { Ingredient } from "../models"

export default {
  Query: {
    ingredient(_, args, context) {
      if (args.id) return context.single.load(Ingredient, args.id)
      if (args.slug) return context.slug.load(Ingredient, args.slug)
      if (args.name) return context.name.load(Ingredient, args.name)
    },
    ingredients(_, args, context) {
      return context.all.load(Ingredient)
    },
  },
  Ingredient: {
    parent: (ingredient, _args, context) => {
      return ingredient.parentId
        ? context.single.load(Ingredient, ingredient.parentId)
        : null
    },
  },
}

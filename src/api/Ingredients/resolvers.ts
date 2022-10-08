import { ApplicationContext } from "../../../pages/api/graphql"
import { Ingredient } from "../models"

export default {
  Query: {
    ingredient(_, args, context: ApplicationContext) {
      if (args.id) return context.single.load(Ingredient, args.id)
      if (args.slug) return context.slug.load(Ingredient, args.slug)
      if (args.name) return context.name.load(Ingredient, args.name)
    },
    ingredients(_, _args, context: ApplicationContext) {
      return context.all.load(Ingredient)
    },
  },
  Ingredient: {
    parent: (ingredient: Ingredient, _args, context: ApplicationContext) => {
      return ingredient.parentId
        ? context.single.load(Ingredient, ingredient.parentId)
        : null
    },
  },
  IngredientDetail: {
    children: (ingredient: Ingredient, _args, context: ApplicationContext) => {
      return context.collection.load(Ingredient, "parentId", ingredient.id)
    },
    cocktails: (ingredient: Ingredient, _args, context: ApplicationContext) => {
      return context.ingredients.cocktails.load(ingredient.id)
    },
  },
}

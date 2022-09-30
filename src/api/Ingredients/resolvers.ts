import { Ingredient } from "../models"
import { hasPermission } from "../Users/authorization/authorization"
import { PermissionType } from "../Users/authorization/permission.enum"

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
    children: (ingredient, _args, context) => {
      return context.collection.load(Ingredient, "parentId", ingredient.id)
    },
    cocktails: (ingredient, _args, context) => {
      return context.ingredients.cocktails.load(ingredient.id)
    },
  },
}

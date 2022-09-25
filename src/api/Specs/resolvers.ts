import { Ingredient, Spec, SpecIngredient } from "../models"
import { Glassware } from "../models/glasssware.model"

export default {
  Query: {
    spec(_, args, context) {
      if (args.id) return context.single.load(Spec, args.id)
      if (args.slug) return context.slug.load(Spec, args.slug)
      if (args.name) return context.name.load(Spec, args.name)
    },
    specs(_, args, context) {
      return context.all.load(Spec)
    },
  },
  Spec: {
    glassware: (spec, args, context) => {
      return context.single.load(Glassware, spec.glasswareId)
    },
    ingredients: (spec, args, context) => {
      return context.collection.load(SpecIngredient, "specId", spec.id)
    },
  },
  SpecIngredient: {
    ingredient: (specIngredient, args, context) => {
      return context.single.load(Ingredient, specIngredient.ingredientId)
    },
  },
}

import { ApplicationContext } from "../../../pages/api/graphql"
import { Ingredient, Spec, SpecIngredient } from "../models"
import { Glassware } from "../models/glasssware.model"

export default {
  Query: {
    spec(_: any, args, context: ApplicationContext) {
      if (args.id) return context.single.load(Spec, args.id)
      if (args.slug) return context.slug.load(Spec, args.slug)
      if (args.name) return context.name.load(Spec, args.name)
    },
    specs(_: any, _args, context: ApplicationContext) {
      return context.all.load(Spec)
    },
  },
  Spec: {
    glassware: (spec: Spec, _args, context: ApplicationContext) => {
      return context.single.load(Glassware, spec.glasswareId)
    },
    ingredients: (spec: Spec, _args, context: ApplicationContext) => {
      return context.collection.load(SpecIngredient, "specId", spec.id)
    },
    riffOn: (spec: Spec, _args, context: ApplicationContext) => {
      return spec.riffOnId ? context.single.load(Spec, spec.riffOnId) : null
    },
  },
  SpecIngredient: {
    ingredient: (
      specIngredient: SpecIngredient,
      _args,
      context: ApplicationContext
    ) => {
      return context.single.load(Ingredient, specIngredient.ingredientId)
    },
  },
}

import { ApplicationContext } from "../../../pages/api/graphql"
import { Ingredient, Spec, SpecIngredient } from "../models"
import { Glassware } from "../models/glasssware.model"

export default {
  Query: {
    spec(_, args, context: ApplicationContext) {
      if (args.id)
        return context.single.load(
          context.sequelize.getRepository(Spec),
          args.id
        )
      if (args.slug)
        return context.slug.load(
          context.sequelize.getRepository(Spec),
          args.slug
        )
      if (args.name)
        return context.name.load(
          context.sequelize.getRepository(Spec),
          args.name
        )
    },
    specs(_, args, context) {
      return context.all.load(context.sequelize.getRepository(Spec))
    },
  },
  Spec: {
    glassware: (spec, args, context) => {
      return context.single.load(
        context.sequelize.getRepository(Glassware),
        spec.glasswareId
      )
    },
    ingredients: (spec, args, context) => {
      return context.collection.load(
        context.sequelize.getRepository(SpecIngredient),
        "specId",
        spec.id
      )
    },
    riffOn: (spec, args, context) => {
      return spec.riffOnId
        ? context.single.load(
            context.sequelize.getRepository(Spec),
            spec.riffOnId
          )
        : null
    },
  },
  SpecIngredient: {
    ingredient: (specIngredient, args, context) => {
      return context.single.load(
        context.sequelize.getRepository(Ingredient),
        specIngredient.ingredientId
      )
    },
  },
}

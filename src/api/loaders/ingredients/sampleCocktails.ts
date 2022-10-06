import DataLoader from "dataloader"
import { Spec, SpecIngredient, sequelize } from "../../models"

export class SampleCocktailsLoader {
  loader: DataLoader<unknown, unknown>

  public load(id) {
    const specIngredientRepository = sequelize.getRepository(SpecIngredient)
    const specRepository = sequelize.getRepository(Spec)
    if (!this.loader) {
      this.loader = new DataLoader(async (ids: string[]) => {
        const specIngredients = await specIngredientRepository.findAll({
          where: {
            or: {
              ingredientId: {
                in: ids,
              },
            },
          },
          include: [specRepository],
        })
        const lookupSpecs = specIngredients.reduce((acc, si) => {
          if (
            acc[si.ingredientId] &&
            !acc[si.ingredientId].find((spec) => spec.id === si.specId)
          ) {
            acc[si.ingredientId] = acc[si.ingredientId].concat(si.spec)
          } else if (!acc[si.ingredientId]) {
            acc[si.ingredientId] = [si.spec]
          }
          return acc
        }, {})
        return ids.map((id) => lookupSpecs[id] ?? null)
      })
    }
    return this.loader.load(id)
  }
}

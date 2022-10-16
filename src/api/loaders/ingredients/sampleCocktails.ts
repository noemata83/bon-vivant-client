import DataLoader from "dataloader"
import { Spec, SpecIngredient } from "../../models"
import { LookupTable } from "../types"

export class SampleCocktailsLoader {
  loader: DataLoader<unknown, unknown>

  public load(id: string) {
    if (!this.loader) {
      this.loader = new DataLoader(async (ids: readonly string[]) => {
        const specIngredients = await SpecIngredient.findAll({
          where: {
            or: {
              ingredientId: {
                in: ids,
              },
            },
          },
          include: [Spec],
        })
        const lookupSpecs = specIngredients.reduce((acc, si) => {
          if (
            acc[si.ingredientId] &&
            !acc[si.ingredientId].find((spec: Spec) => spec.id === si.specId)
          ) {
            acc[si.ingredientId] = acc[si.ingredientId].concat(si.spec)
          } else if (!acc[si.ingredientId]) {
            acc[si.ingredientId] = [si.spec]
          }
          return acc
        }, {} as LookupTable)
        return ids.map((id) => lookupSpecs[id] ?? null)
      })
    }
    return this.loader.load(id)
  }
}

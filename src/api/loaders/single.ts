import DataLoader from "dataloader"
import { Model, ModelCtor } from "sequelize-typescript"
import { IdType, Loaders } from "./types"

export class ByIdLoader {
  loaders: Loaders = {}

  public load(model: ModelCtor, id) {
    return this.findLoader(model).load(id)
  }

  findLoader(model: ModelCtor) {
    if (!this.loaders[model.name]) {
      this.loaders[model.name] = new DataLoader(async (ids: IdType[]) => {
        const rows = await model.findAll({ where: { id: { in: ids } } })
        const lookup: { [key: IdType]: Model } = rows.reduce((acc, row) => {
          acc[row.id] = row
          return acc
        }, {})

        return ids.map((id) => lookup[id] || null)
      })
    }
    return this.loaders[model.name]
  }
}

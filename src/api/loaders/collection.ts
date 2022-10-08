import DataLoader from "dataloader"
import { Model, ModelCtor } from "sequelize-typescript"
import { IdType, Loaders } from "./types"

export class AssociatedCollectionLoader {
  loaders: Loaders = {}

  public load(model: ModelCtor, key, id) {
    return this.findLoader(model, key).load(id)
  }

  findLoader(model: ModelCtor, key: string) {
    if (!this.loaders[model.name]) {
      this.loaders[model.name] = new DataLoader(async (ids: IdType[]) => {
        const rows = await model.findAll({ where: { [key]: { in: ids } } })
        const lookup: { [key: IdType]: Model[] } = rows.reduce((acc, row) => {
          if (acc[row[key]]) {
            acc[row[key]] = acc[row[key]].concat(row)
          } else {
            acc[row[key]] = [row]
          }
          return acc
        }, {})

        return ids.map((id) => lookup[id] || null)
      })
    }
    return this.loaders[model.name]
  }
}

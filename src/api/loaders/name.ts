import DataLoader from "dataloader"
import { Model, ModelCtor } from "sequelize-typescript"
import { Loaders } from "./types"

interface NameModel extends Model {
  name: string
}

export class ByNameLoader {
  loaders: Loaders = {}

  public load(model: ModelCtor, id) {
    return this.findLoader(model).load(id)
  }

  findLoader(model: ModelCtor) {
    if (!this.loaders[model.name]) {
      this.loaders[model.name] = new DataLoader(async (names: string[]) => {
        const rows: NameModel[] = (await model.findAll({
          where: { name: { in: names } },
        })) as NameModel[]
        const lookup: { [key: string]: NameModel } = rows.reduce((acc, row) => {
          acc[row.name] = row
          return acc
        }, {})

        return names.map((name) => lookup[name] || null)
      })
    }
    return this.loaders[model.name]
  }
}

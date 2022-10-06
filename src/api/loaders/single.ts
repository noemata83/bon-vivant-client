import DataLoader from "dataloader"
import { Model, Repository } from "sequelize-typescript"
import { IdType, Loaders } from "./types"

export class ByIdLoader {
  loaders: Loaders = {}

  public load<T extends Model>(repository: Repository<T>, id) {
    return this.findLoader<T>(repository).load(id)
  }

  findLoader<T extends Model>(repository: Repository<T>) {
    if (!this.loaders[repository.name]) {
      this.loaders[repository.name] = new DataLoader(async (ids: IdType[]) => {
        const rows = await repository.findAll({ where: { id: { in: ids } } })
        const lookup: { [key: IdType]: Model } = rows.reduce((acc, row) => {
          acc[row.id] = row
          return acc
        }, {})

        return ids.map((id) => lookup[id] || null)
      })
    }
    return this.loaders[repository.name]
  }
}

import DataLoader from "dataloader"
import { Op } from "sequelize"
import { Model, Repository } from "sequelize-typescript"
import { IdType, Loaders } from "./types"

export class AssociatedCollectionLoader {
  loaders: Loaders = {}

  public load<T extends Model>(repository: Repository<T>, key, id) {
    return this.findLoader(repository, key).load(id)
  }

  findLoader<T extends Model>(repository: Repository<T>, key) {
    if (!this.loaders[repository.name]) {
      this.loaders[repository.name] = new DataLoader(async (ids: IdType[]) => {
        const where = {
          [key]: { [Op.in]: ids },
        }
        const rows = await repository.findAll({
          where,
        })
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
    return this.loaders[repository.name]
  }
}

import DataLoader from "dataloader"
import { Op } from "sequelize"
import { Model, Repository } from "sequelize-typescript"
import { Loaders } from "./types"

interface NameModel extends Model {
  name: string
}

export class ByNameLoader {
  loaders: Loaders = {}

  public load<T extends NameModel>(repository: Repository<T>, id) {
    return this.findLoader(repository).load(id)
  }

  findLoader<T extends NameModel>(repository: Repository<T>) {
    if (!this.loaders[repository.name]) {
      this.loaders[repository.name] = new DataLoader(
        async (names: string[]) => {
          const where = { name: { [Op.in]: names } }
          const rows: NameModel[] = (await repository.findAll({
            where,
          })) as NameModel[]
          const lookup: { [key: string]: NameModel } = rows.reduce(
            (acc, row) => {
              acc[row.name] = row
              return acc
            },
            {}
          )

          return names.map((name) => lookup[name] || null)
        }
      )
    }
    return this.loaders[repository.name]
  }
}

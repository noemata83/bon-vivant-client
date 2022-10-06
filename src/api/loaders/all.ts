import DataLoader from "dataloader"
import { Model, ModelCtor, Repository } from "sequelize-typescript"
import { Loaders } from "./types"

// so this is pretty silly, but I wanted to retire the controller
export class AllLoader {
  loaders: Loaders = {}

  public load<T extends Model>(repository: Repository<T>) {
    return this.findLoader(repository).load("all")
  }

  findLoader<T extends Model>(repository: Repository<T>) {
    if (!this.loaders[repository.name]) {
      this.loaders[repository.name] = new DataLoader(async () => {
        const rows = await repository.findAll()
        return [rows]
      })
    }
    return this.loaders[repository.name]
  }
}

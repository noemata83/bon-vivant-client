import DataLoader from "dataloader"
import { ModelCtor } from "sequelize-typescript"
import { Loaders } from "./types"

// so this is pretty silly, but I wanted to retire the controller
export class AllLoader {
  loaders: Loaders = {}

  public load(model: ModelCtor) {
    return this.findLoader(model).load("all")
  }

  findLoader(model: ModelCtor) {
    if (!this.loaders[model.name]) {
      this.loaders[model.name] = new DataLoader(async () => {
        const rows = await model.findAll()
        return [rows]
      })
    }
    return this.loaders[model.name]
  }
}

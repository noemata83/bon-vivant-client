import DataLoader from "dataloader"
import { Model, ModelCtor } from "sequelize-typescript"
import { Loaders } from "./types"

interface SlugModel extends Model {
  slug: string
}

type Slug = string

export class BySlugLoader {
  loaders: Loaders = {}

  public load(model: ModelCtor, id) {
    return this.findLoader(model).load(id)
  }

  findLoader(model: ModelCtor) {
    if (!this.loaders[model.name]) {
      this.loaders[model.name] = new DataLoader(async (slugs: Slug[]) => {
        const rows = (await model.findAll({
          where: { slug: { in: slugs } },
        })) as SlugModel[]
        const lookup: { [key: Slug]: Model } = rows.reduce((acc, row) => {
          acc[row.slug] = row
          return acc
        }, {})

        return slugs.map((slug) => lookup[slug] || null)
      })
    }
    return this.loaders[model.name]
  }
}

import DataLoader from "dataloader"
import { User } from "../../models"
import { Spec } from "../../models/spec.model"

export class CocktailBookLoader {
  loader: DataLoader<unknown, unknown>

  public load(requestedId) {
    if (!this.loader) {
      this.loader = new DataLoader(async (userIds: string[]) => {
        const specs = await Spec.findAll({
          include: [
            {
              model: User,
              as: "usersSaved",
              through: {
                where: {
                  UserId: {
                    in: userIds,
                  },
                },
              },
            },
          ],
        })
        const lookup = userIds.reduce(
          (acc, id) => ({
            ...acc,
            [id]: specs.filter((spec) =>
              spec.usersSaved.map((user) => user.id).includes(id)
            ),
          }),
          {}
        )
        return userIds.map((id) => lookup[id])
      })
    }
    return this.loader.load(requestedId)
  }
}

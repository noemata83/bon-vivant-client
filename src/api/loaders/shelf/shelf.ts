import DataLoader from "dataloader"
import { Ingredient, User } from "../../models"

export class ShelfLoader {
  private loader: DataLoader<unknown, unknown>

  load(requestedUserId: string) {
    if (!this.loader) {
      this.loader = new DataLoader(async (userIds: string[]) => {
        const ingredientRows = await Ingredient.findAll({
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
            [id]: ingredientRows.filter((row) =>
              row.usersSaved.map((user) => user.id).includes(id)
            ),
          }),
          {}
        )
        return userIds.map((id) => lookup[id])
      })
    }
    return this.loader.load(requestedUserId)
  }
}

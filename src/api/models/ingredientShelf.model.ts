import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript"
import Fix from "./decorators/fix.decorator"
import { Ingredient } from "./ingredient.model"
import { User } from "./user.model"

@Fix
@Table({
  tableName: "IngredientShelves",
})
export class IngredientShelf extends Model {
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  UserId: string

  @ForeignKey(() => Ingredient)
  @Column(DataType.UUID)
  IngredientId: string
}

import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript"
import { IngredientFamily } from "."
import Fix from "./decorators/fix.decorator"
import { Ingredient } from "./ingredient.model"

@Fix
@Table({
  tableName: "IngredientsAndFamilies",
})
export class IngredientAndFamily extends Model {
  @ForeignKey(() => Ingredient)
  @Column(DataType.STRING)
  declare IngredientId: string

  @ForeignKey(() => IngredientFamily)
  @Column(DataType.STRING)
  declare IngredientFamilyId: string
}

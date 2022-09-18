import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript"
import Fix from "./decorators/fix.decorator"
import { IngredientFamily } from "./ingredientfamily.model"
import { SpecIngredient } from "./specingredient.model"

@Fix
@Table({
  tableName: "IngredientSubstitutionClasses",
})
export class IngredientSubstitionClass extends Model {
  @ForeignKey(() => SpecIngredient)
  @Column(DataType.UUID)
  SpecingredientId: string

  @ForeignKey(() => IngredientFamily)
  @Column(DataType.UUID)
  IngredientFamilyId: string
}

import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript"
import Fix from "./decorators/fix.decorator"
import { Spec } from "./spec.model"
import { User } from "./user.model"

@Fix
@Table({
  tableName: "CocktailBooks",
})
export class CocktailBook extends Model {
  @ForeignKey(() => User)
  @Column(DataType.STRING)
  declare UserId: string

  @ForeignKey(() => Spec)
  @Column(DataType.STRING)
  declare SpecId: string
}

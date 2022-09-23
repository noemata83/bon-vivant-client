import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"
import Fix from "./decorators/fix.decorator"

@Fix
@Table
export class PreparationType extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number

  @Column(DataType.STRING)
  name: string
}

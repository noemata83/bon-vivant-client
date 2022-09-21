import { DataTypes } from "sequelize"
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"
import { Spec } from "./spec.model"
import { v4 as uuid } from "uuid"
import { User } from "./user.model"
import Fix from "./decorators/fix.decorator"

@Fix
@Table
export class Review extends Model {
  @PrimaryKey
  @Default(() => uuid())
  @AllowNull(false)
  @Column(DataTypes.UUID)
  id: string

  @Column(DataType.NUMBER)
  rating: number

  @Column(DataType.TEXT)
  content: string

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  UserId: string

  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => Spec)
  @Column(DataType.UUID)
  SpecId: string

  @BelongsTo(() => Spec)
  spec: Spec
}

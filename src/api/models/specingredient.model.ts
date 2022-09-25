"use strict"
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
import { Measurement } from "../../types/measurement"
import { Ingredient } from "./ingredient.model"
import { Spec } from "./spec.model"
import Fix from "./decorators/fix.decorator"
import { v4 as uuid } from "uuid"

@Fix
@Table
export class SpecIngredient extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(() => uuid())
  @Column(DataType.UUID)
  declare id: string

  @Column(DataType.FLOAT)
  declare quantity: number

  @Column(
    DataType.ENUM(
      "OZ",
      "ML",
      "TSP",
      "TBSP",
      "DS",
      "DR",
      "PN",
      "BSP",
      "SPL",
      "RINSE",
      "TWIST",
      "SPG",
      "SLI",
      "WDG",
      "CUBE"
    )
  )
  declare measure: Measurement

  @BelongsTo(() => Ingredient)
  declare ingredient: Ingredient

  @ForeignKey(() => Ingredient)
  @Column(DataType.STRING)
  declare ingredientId: string

  @BelongsTo(() => Spec)
  declare spec: Spec

  @ForeignKey(() => Spec)
  @Column(DataType.STRING)
  declare specId: string

  @Column(DataType.BOOLEAN)
  declare canSub: boolean
}

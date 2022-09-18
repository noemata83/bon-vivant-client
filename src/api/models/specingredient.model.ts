"use strict"
import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"
import { Measurement } from "../../types/measurement"
import { Ingredient } from "./ingredient.model"
import { IngredientFamily } from "./ingredientfamily.model"
import { Spec } from "./spec.model"
import { IngredientSubstitionClass } from "./ingredientSubstitutionClass.model"
import Fix from "./decorators/fix.decorator"

@Fix
@Table
export class SpecIngredient extends Model {
  @PrimaryKey
  @AllowNull(false)
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

  @BelongsToMany(
    () => IngredientFamily,
    () => IngredientSubstitionClass,
    "SpecingredientId",
    "IngredientFamilyId"
  )
  subWith: IngredientFamily[]
}

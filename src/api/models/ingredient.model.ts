import slugify from "slugify"
import {
  Table,
  Column,
  Model,
  AllowNull,
  Default,
  PrimaryKey,
  BelongsToMany,
  BeforeCreate,
  BeforeUpdate,
  Unique,
} from "sequelize-typescript"
import { DataTypes } from "sequelize"
import { SpecIngredient } from "./specingredient.model"
import { Spec } from "./spec.model"
import { IngredientFamily } from "./ingredientfamily.model"
import { User } from "./user.model"
import { v4 as uuid } from "uuid"
import { IngredientAndFamily } from "./ingredientAndFamily.model"
import Fix from "./decorators/fix.decorator"

@Fix
@Table
export class Ingredient extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(() => uuid())
  @Column(DataTypes.UUID)
  declare id: string

  @Column(DataTypes.STRING)
  declare name: string

  @Unique
  @Column(DataTypes.STRING)
  declare slug: string

  @Column(DataTypes.TEXT)
  declare description?: string

  @BelongsToMany(() => Spec, () => SpecIngredient)
  declare specs: Spec[]

  @BelongsToMany(() => IngredientFamily, () => IngredientAndFamily)
  declare family: IngredientFamily[]

  @BeforeUpdate
  @BeforeCreate
  static slugifyName(ingredient: Ingredient) {
    if (!ingredient.slug) {
      const slug = slugify(ingredient.name.toLowerCase())
      ingredient.slug = slug
    }
  }
}

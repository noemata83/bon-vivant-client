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
  BelongsTo,
  ForeignKey,
  DataType,
} from "sequelize-typescript"
import { SpecIngredient } from "./specingredient.model"
import { Spec } from "./spec.model"
import { IngredientFamily } from "./ingredientfamily.model"
import { v4 as uuid } from "uuid"
import { IngredientAndFamily } from "./ingredientAndFamily.model"
import Fix from "./decorators/fix.decorator"

@Fix
@Table
export class Ingredient extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(() => uuid())
  @Column(DataType.UUID)
  declare id: string

  @Column(DataType.STRING)
  declare name: string

  @Unique
  @Column(DataType.STRING)
  declare slug: string

  @Column(DataType.TEXT)
  declare description?: string

  @BelongsToMany(() => Spec, () => SpecIngredient)
  declare specs: Spec[]

  @BelongsToMany(() => IngredientFamily, () => IngredientAndFamily)
  declare family: IngredientFamily[]

  @BelongsTo(() => Ingredient)
  parent?: Ingredient

  @ForeignKey(() => Ingredient)
  @AllowNull(true)
  @Column(DataType.UUID)
  parentId: string

  @BeforeUpdate
  @BeforeCreate
  static slugifyName(ingredient: Ingredient) {
    if (!ingredient.slug) {
      const slug = slugify(ingredient.name.toLowerCase())
      ingredient.slug = slug
    }
  }
}

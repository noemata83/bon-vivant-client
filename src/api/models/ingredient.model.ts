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
import { v4 as uuid } from "uuid"
import Fix from "./decorators/fix.decorator"
import { User } from "./user.model"
import { IngredientShelf } from "./ingredientShelf.model"

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

  @Column(DataType.INTEGER)
  proof: number

  @Column(DataType.STRING)
  imageURL: string

  @BelongsToMany(() => Spec, () => SpecIngredient)
  declare specs: Spec[]

  @BelongsToMany(() => User, () => IngredientShelf)
  usersSaved: User[]

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

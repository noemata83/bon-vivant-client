import { FamilyRestroom } from "@mui/icons-material"
import { DataTypes } from "sequelize"
import {
  AllowNull,
  BeforeCreate,
  BeforeUpdate,
  BelongsToMany,
  Column,
  Default,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"
import slugify from "slugify"
import Fix from "./decorators/fix.decorator"
import { v4 as uuid } from "uuid"
import { Ingredient } from "./ingredient.model"
import { IngredientAndFamily } from "./ingredientAndFamily.model"
import { IngredientSubstitionClass } from "./ingredientSubstitutionClass.model"
import { SpecIngredient } from "./specingredient.model"

@Fix
@Table
export class IngredientFamily extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(() => uuid())
  @Column(DataTypes.UUID)
  declare id: string

  @Column(DataTypes.STRING)
  declare name: string

  @Column(DataTypes.STRING)
  declare slug: string

  @Column(DataTypes.TEXT)
  declare description: string

  @BelongsToMany(() => Ingredient, () => IngredientAndFamily)
  ingredients: Ingredient[]

  @BelongsToMany(() => SpecIngredient, () => IngredientSubstitionClass)
  subbedFor: SpecIngredient[]

  @BeforeCreate
  @BeforeUpdate
  static slugifyName(ingredientFamily: IngredientFamily) {
    if (!ingredientFamily.slug) {
      const slug = slugify(ingredientFamily.name.toLowerCase())
      ingredientFamily.slug = slug
    }
  }
}

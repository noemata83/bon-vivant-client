import bcrypt from "bcrypt"
import {
  AllowNull,
  BeforeCreate,
  BeforeUpdate,
  BelongsToMany,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"
import uuid from "uuid"
import { CocktailBook } from "./cocktailBook.model"
import Fix from "./decorators/fix.decorator"
import { Ingredient } from "./ingredient.model"
import { IngredientShelf } from "./ingredientShelf.model"
import { Spec } from "./spec.model"

@Fix
@Table
export class User extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(() => uuid.v4())
  @Column(DataType.UUID)
  id: string

  @Column(DataType.STRING)
  username: string

  @Column(DataType.STRING)
  email: string

  @Column(DataType.STRING)
  password: string

  @BelongsToMany(() => Ingredient, () => IngredientShelf)
  shelf: Ingredient[]

  @BelongsToMany(() => Spec, () => CocktailBook)
  book: Spec[]

  @BeforeCreate
  @BeforeUpdate
  static hashPassword(user: User) {
    const hashedPassword = bcrypt.hash(user.password, 10)
    user.password = hashedPassword
  }

  public async isValidPassword(password) {
    return await bcrypt.compare(password, this.password)
  }
}

import bcrypt from "bcrypt"
import {
  AllowNull,
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"
import { v4 as uuid } from "uuid"
import { CocktailBook } from "./cocktailBook.model"
import Fix from "./decorators/fix.decorator"
import { Ingredient } from "./ingredient.model"
import { IngredientShelf } from "./ingredientShelf.model"
import { Permission } from "./permission.model"
import { Spec } from "./spec.model"
import { UserRole } from "./userRole.model"

@Fix
@Table
export class User extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(() => uuid())
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

  @BelongsTo(() => UserRole)
  userRole: UserRole

  @ForeignKey(() => UserRole)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  roleId: number

  @BeforeCreate
  @BeforeUpdate
  static hashPassword(user: User) {
    const hashedPassword = bcrypt.hash(user.password, 10)
    user.password = hashedPassword
  }

  public async isValidPassword(password) {
    return await bcrypt.compare(password, this.password)
  }

  public hasPermission(permission: Permission): boolean {
    return this.userRole.permissions.map((p) => p.id).includes(permission.id)
  }
}

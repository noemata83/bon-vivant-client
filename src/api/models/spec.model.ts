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
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"
import slugify from "slugify"
import { CocktailBook } from "./cocktailBook.model"
import Fix from "./decorators/fix.decorator"
import { Review } from "./review.model"
import { SpecIngredient } from "./specingredient.model"
import { User } from "./user.model"
import { v4 as uuid } from "uuid"
import { Glassware } from "./glasssware.model"
import { PreparationType } from "../../types/preparationType"

@Fix
@Table
export class Spec extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(() => uuid())
  @Column(DataType.UUID)
  declare id: string

  @Default(Date.now())
  @AllowNull(false)
  @Column(DataType.DATE)
  declare dateAdded: Date

  @Column(DataType.STRING)
  declare source: string

  @Column(DataType.STRING)
  declare name: string

  @Column(DataType.STRING)
  declare slug: string

  @Column(DataType.TEXT)
  declare description: string

  @Column(DataType.TEXT)
  declare directions: string

  @ForeignKey(() => Spec)
  @Column(DataType.UUID)
  declare riffOnId: string

  @HasOne(() => Spec)
  riffOn?: Spec

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  contributedById: string

  @BelongsTo(() => User)
  contributedBy: User

  @HasMany(() => SpecIngredient)
  ingredients: SpecIngredient[]

  @BelongsToMany(() => User, () => CocktailBook)
  usersSaved: User[]

  @HasMany(() => Review)
  reviews: Review[]

  @ForeignKey(() => Glassware)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  glasswareId: number

  @BelongsTo(() => Glassware)
  glassware: Glassware

  @AllowNull(true)
  @Column(DataType.ENUM("SHAKEN", "STIRRED", "OTHER"))
  preparationType: PreparationType

  @BeforeUpdate
  @BeforeCreate
  static slugifyName(spec: Spec) {
    if (!spec.slug) {
      const slug = slugify(spec.name.toLowerCase())
      spec.slug = slug
    }
  }
}

// module.exports = (sequelize, DataTypes) => {
//   const spec = sequelize.define(
//     "Spec",
//     {
//       id: {
//         type: DataTypes.UUID,
//         primaryKey: true,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         autoIncrement: false,
//       },
//       dateAdded: {
//         type: DataTypes.DATE,
//         defaultValue: new Date(),
//         allowNull: false,
//       },
//       source: DataTypes.STRING,
//       name: DataTypes.STRING,
//       slug: DataTypes.STRING,
//       description: DataTypes.TEXT,
//       directions: DataTypes.TEXT,
//     },
//     {}
//   )
//   spec.associate = function (models) {
//     spec.hasOne(models.Spec, {
//       as: "riffOn",
//       useJunctionTable: false,
//     })
//     spec.belongsTo(models.User, { as: "contributedBy" })
//     spec.belongsToMany(models.Ingredient, {
//       through: "SpecIngredients",
//       as: "ingredients",
//       foreignKey: "specId",
//     })
//     spec.belongsToMany(models.User, {
//       through: "CocktailBooks",
//       as: "users_saved",
//     })
//     spec.hasMany(models.Review, {
//       as: "reviews",
//     })
//   }
//   spec.addHook("beforeCreate", (spec, options) => {
//     if (!spec.slug) {
//       const slug = slugify(spec.name.toLowerCase())
//       spec.slug = slug
//     }
//   })
//   return spec
// }

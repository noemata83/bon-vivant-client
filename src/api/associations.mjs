import Ingredient, { SpecIngredient } from "./Ingredients/Ingredient.mjs"
import IngredientFamily from "./Ingredients/IngredientFamily.mjs"
import Spec from "./Specs/Spec.mjs"
import User from "./Users/User.mjs"
import Review from "./Specs/Review.mjs"

export default () => {
  Ingredient.belongsToMany(IngredientFamily, {
    through: "ingFamilies",
    constraints: false,
    as: "family",
    foreignKey: "ingredientId",
    otherKey: "familyId"
  })
  Ingredient.belongsToMany(Spec, {
    through: "specIngredients",
    constraints: false,
    as: "ingredients",
    onDelete: "cascade",
    foreignKey: "ingredientId",
    otherKey: "specId"
  })
  Ingredient.hasOne(Spec, { foreignKey: "spec" })
  Spec.belongsToMany(Ingredient, {
    through: "specIngredients",
    as: "ingredients",
    foreignKey: "specId",
    otherKey: "ingredientId"
  })
  IngredientFamily.belongsToMany(Ingredient, {
    through: "ingFamilies",
    constraints: false,
    onDelete: "cascade",
    as: "ingredients",
    foreignKey: "familyId",
    otherKey: "ingredientId"
  })

  IngredientFamily.hasOne(IngredientFamily, {
    as: "parent",
    foreignKey: "parentId",
    useJunctionTable: false
  })

  Spec.hasMany(Review)

  Spec.hasOne(User, {
    as: "author"
  })

  Spec.hasOne(Spec, {
    as: "riffOn",
    useJunctionTable: false
  })
  User.belongsToMany(Spec, { as: "book", through: "userBooks" })
  User.belongsToMany(Ingredient, { as: "shelf", through: "userShelf" })
}

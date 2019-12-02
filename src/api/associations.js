import Ingredient, { SpecIngredient } from "./Ingredients/Ingredient"
import IngredientFamily from "./Ingredients/IngredientFamily"
import Spec from "./Specs/Spec"
import User from "./Users/User"
import Review from "./Specs/Review"

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

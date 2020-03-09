"use strict"
module.exports = (sequelize, DataTypes) => {
  const ingredient = sequelize.define(
    "Ingredient",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false
      },
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.TEXT
    },
    {}
  )
  ingredient.associate = function(models) {
    ingredient.belongsToMany(models.ingredientFamily, {
      through: "IngredientsAndFamilies",
      as: "family"
    })
    ingredient.belongsToMany(models.spec, {
      through: "SpecIngredients"
    })
    ingredient.belongsToMany(models.user, {
      through: "IngredientShelves",
      as: "shelf_users"
    })
  }

  ingredient.addHook("beforeCreate", (ingredient, options) => {
    if (!ingredient.slug) {
      const slug = slugify(ingredient.name.toLowerCase())
      ingredient.slug = slug
    }
  })
  return ingredient
}

"use strict"

const slugify = require("slugify")

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
    ingredient.belongsToMany(models.IngredientFamily, {
      through: "IngredientsAndFamilies",
      as: "family"
    })
    ingredient.belongsToMany(models.Spec, {
      through: "SpecIngredients",
      as: "ingredients",
      foreignKey: "ingredientId"
    })
    ingredient.belongsToMany(models.User, {
      through: "IngredientShelves",
      as: "shelf_users"
    })
  }

  ingredient.addHook("beforeCreate", (ingredient, options) => {
    console.log(ingredient)
    if (!ingredient.slug) {
      const slug = slugify(ingredient.name.toLowerCase())
      ingredient.slug = slug
    }
  })
  return ingredient
}

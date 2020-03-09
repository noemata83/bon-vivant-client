"use strict"
module.exports = (sequelize, DataTypes) => {
  const ingredientFamily = sequelize.define(
    "IngredientFamily",
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
  ingredientFamily.associate = function(models) {
    ingredientFamily.belongsToMany(models.Ingredient, {
      through: "IngredientsAndFamilies",
      constraints: false,
      onDelete: "cascade",
      as: "ingredients"
    })

    ingredientFamily.belongsToMany(models.specIngredient, {
      as: "subbedFor",
      through: "IngredientSubstitionClasses"
    })
  }

  ingredientFamily.addHook("beforeCreate", (family, options) => {
    if (!family.slug) {
      const slug = slugify(family.name.toLowerCase())
      family.slug = slug
    }
  })
  return ingredientFamily
}

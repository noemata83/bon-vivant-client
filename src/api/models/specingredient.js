"use strict"
const uuid = require("uuid")
module.exports = (sequelize, DataTypes) => {
  const specingredient = sequelize.define(
    "SpecIngredient",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false
      },
      quantity: DataTypes.FLOAT,
      measure: DataTypes.ENUM([
        "OZ",
        "ML",
        "TSP",
        "TBSP",
        "DS",
        "DR",
        "PN",
        "BSP",
        "SPL",
        "RINSE",
        "TWIST",
        "SPG",
        "SLI",
        "WDG",
        "CUBE"
      ]),
      ingredientId: {
        type: DataTypes.UUID,
        references: {
          model: "Ingredients",
          key: "id",
          primaryKey: true
        }
      },
      specId: {
        type: DataTypes.UUID,
        references: {
          model: "Specs",
          key: "id",
          primaryKey: true
        }
      },
      canSub: DataTypes.BOOLEAN
    },
    {}
  )
  specingredient.associate = function(models) {
    specingredient.belongsToMany(models.IngredientFamily, {
      as: "subWith",
      through: "IngredientSubstitionClasses",
      onDelete: "CASCADE"
    })
  }
  return specingredient
}

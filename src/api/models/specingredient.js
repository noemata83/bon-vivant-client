"use strict"
module.exports = (sequelize, DataTypes) => {
  const specingredient = sequelize.define(
    "SpecIngredient",
    {
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
        types: DataTypes.UUID,
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
    // associations can be defined here
  }
  return specingredient
}

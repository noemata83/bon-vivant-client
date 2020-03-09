"use strict"
module.exports = (sequelize, DataTypes) => {
  const specingredient = sequelize.define(
    "SpecIngredient",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
    specingredient.belongsToMany(models.ingredientFamily, {
      as: "subWith",
      through: "IngredientSubstitionClasses"
    })
  }
  return specingredient
}

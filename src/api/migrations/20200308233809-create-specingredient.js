"use strict"
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("SpecIngredients", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        autoIncrement: false
      },
      quantity: {
        type: Sequelize.FLOAT
      },
      measure: {
        type: Sequelize.ENUM([
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
        ])
      },
      ingredientId: {
        type: Sequelize.UUID,
        references: {
          model: "Ingredients",
          key: "id"
        },
        primaryKey: true
      },
      specId: {
        type: Sequelize.UUID,
        references: {
          model: "Specs",
          key: "id"
        },
        primaryKey: true
      },
      canSub: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("SpecIngredients")
  }
}

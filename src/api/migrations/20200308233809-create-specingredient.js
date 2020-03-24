"use strict"
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("SpecIngredients", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        primaryKey: true
      },
      specId: {
        type: Sequelize.UUID,
        references: {
          model: "Specs",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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

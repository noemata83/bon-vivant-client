"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("IngredientsAndFamilies", {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        timestamps: false
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        timestamps: false
      },
      IngredientId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: "Ingredients",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      IngredientFamilyId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: "IngredientFamilies",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("IngredientsAndFamilies")
  }
}

"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("IngredientShelves", {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id"
        },
        primaryKey: true
      },
      ingredientId: {
        type: Sequelize.UUID,
        references: {
          model: "Ingredients",
          key: "id"
        },
        primaryKey: true
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("IngredientShelves")
  }
}

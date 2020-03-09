"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("IngredientsAndFamilies", {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      IngredientId: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      IngredientFamilyId: {
        type: Sequelize.UUID,
        primaryKey: true
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("IngredientsAndFamilies")
  }
}

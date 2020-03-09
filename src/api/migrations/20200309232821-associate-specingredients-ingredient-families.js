"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("IngredientSubstitutionClasses", {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      specingredientId: {
        type: Sequelize.UUID,
        references: {
          model: "SpecIngredients",
          key: "id"
        },
        primaryKey: true
      },
      ingredientFamilyId: {
        type: Sequelize.UUID,
        references: {
          model: "IngredientFamilies",
          key: "id"
        },
        primaryKey: true
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("IngredientSubstitutionClasses")
  }
}

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
      SpecingredientId: {
        type: Sequelize.UUID,
        references: {
          model: "SpecIngredients",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        primaryKey: true
      },
      IngredientFamilyId: {
        type: Sequelize.UUID,
        references: {
          model: "IngredientFamilies",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        primaryKey: true
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("IngredientSubstitutionClasses")
  }
}

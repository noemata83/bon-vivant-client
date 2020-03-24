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
      UserId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id"
        },
        primaryKey: true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      IngredientId: {
        type: Sequelize.UUID,
        references: {
          model: "Ingredients",
          key: "id"
        },
        primaryKey: true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("IngredientShelves")
  }
}

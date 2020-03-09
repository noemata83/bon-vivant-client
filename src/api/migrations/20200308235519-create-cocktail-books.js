"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("CocktailBooks", {
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
      specId: {
        type: Sequelize.UUID,
        references: {
          model: "Specs",
          key: "id"
        },
        primaryKey: true
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("CocktailBooks")
  }
}

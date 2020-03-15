"use strict"
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("IngredientFamilies", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false
      },
      name: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        timestamps: false
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        timestamps: false
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("IngredientFamilies")
  }
}

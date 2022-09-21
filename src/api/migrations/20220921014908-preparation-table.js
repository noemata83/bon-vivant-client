"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PreparationTypes", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PreparationTypes")
  },
}

"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Permissions", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      action: {
        type: Sequelize.DataTypes.STRING,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Permissions")
  },
}

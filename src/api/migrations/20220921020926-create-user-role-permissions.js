"use strict"

const sequelize = require("sequelize")

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserRolePermissions", {
      userRoleId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "UserRoles",
          key: "id",
          onDelete: "CASCADE",
        },
      },
      permissionId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Permissions",
          key: "id",
          onDelete: "CASCADE",
        },
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserRolePermissions")
  },
}

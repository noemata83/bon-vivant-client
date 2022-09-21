"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "roleId", {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: "UserRoles",
        key: "id",
        onDelete: "SET NULL",
      },
      allowNull: false,
      defaultValue: 2,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "roleId")
  },
}

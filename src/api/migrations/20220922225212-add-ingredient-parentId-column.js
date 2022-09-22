"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Ingredients", "parentId", {
      type: Sequelize.DataTypes.UUID,
      references: {
        model: "Ingredients",
        key: "id",
        onDelete: "CASCADE",
      },
      allowNull: true,
      defaultValue: null,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Ingredients", "parentId")
  },
}

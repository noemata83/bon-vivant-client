"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn(
        "Specs",
        "glasswareId",
        {
          type: Sequelize.DataTypes.UUID,
          refences: {
            model: "Glassware",
            key: "id",
            onDelete: "SET NULL",
          },
        },
        { transaction: t }
      )
      await queryInterface.addColumn(
        "Specs",
        "preparationTypeId",
        {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: "PreparationTypes",
            key: "id",
            onDelete: "SET NULL",
          },
        },
        { transaction: t }
      )
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeColumn("Specs", "glasswareId")
      await queryInterface.removeColumn("Specs", "preparationTypeId")
    })
  },
}

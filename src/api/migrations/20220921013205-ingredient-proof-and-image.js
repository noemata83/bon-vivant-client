"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn(
        "Ingredients",
        "proof",
        {
          type: Sequelize.INTEGER,
          default: null,
        },
        { transaction: t }
      )
      await queryInterface.addColumn(
        "Ingredients",
        "imageURL",
        {
          type: Sequelize.STRING,
          default: null,
        },
        { transaction: t }
      )
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeColumn("Ingredients", "proof", {
        transaction: t,
      })
      await queryInterface.removeColumn("Ingredients", "imageURL", {
        transaction: t,
      })
    })
  },
}

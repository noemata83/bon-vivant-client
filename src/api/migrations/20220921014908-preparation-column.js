"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Specs", "preparationType", {
      type: Sequelize.ENUM("SHAKEN", "STIRRED", "OTHER"),
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Specs", "preparationType")
  },
}

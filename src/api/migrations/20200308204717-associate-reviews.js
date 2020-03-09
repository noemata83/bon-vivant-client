"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Reviews", "SpecId", {
      type: Sequelize.UUID,
      references: {
        model: "Specs",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Reviews", "SpecId")
  }
}

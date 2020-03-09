"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Specs", "riffOn", {
      type: Sequelize.UUID,
      references: {
        model: "Specs",
        key: "id"
      },
      onDelete: "SET NULL"
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Specs", "riffOn")
  }
}

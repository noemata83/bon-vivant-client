"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Specs", "contributedBy", {
      type: Sequelize.UUID,
      references: {
        model: "Users",
        key: "id"
      },
      onDelete: "SET NULL"
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Specs", "contributedBy")
  }
}

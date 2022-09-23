"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Glasswares", [
      {
        name: "Single Rocks",
      },
      {
        name: "Double Rocks",
      },
      {
        name: "Coupe",
      },
      {
        name: "Highball",
      },
      {
        name: "Nick and Nora",
      },
      {
        name: "Martini",
      },
      {
        name: "Collins",
      },
      {
        name: "Tiki Mug",
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Glasswares", {})
  },
}

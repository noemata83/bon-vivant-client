"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable("UserRoles", {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.DataTypes.STRING,
        },
        description: {
          type: Sequelize.DataTypes.STRING,
        },
      })
      await queryInterface.bulkInsert("UserRoles", [
        {
          name: "Administrator",
          description: "Site admin. Full permissions granted.",
        },
        {
          name: "Curator",
          description:
            "Curators can both create and organize specs and ingredients.",
        },
        {
          name: "Contributor",
          description: "Contributors can create new specs and riffs.",
        },
        {
          name: "Guest",
          description: "Read-only permissions.",
        },
      ])
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserRoles")
  },
}

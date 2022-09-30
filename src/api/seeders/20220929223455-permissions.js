"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Permissions", [
      {
        id: 1,
        action: "ListIngredients",
      },
      {
        id: 2,
        action: "CreateIngredient",
      },
      {
        id: 3,
        action: "EditIngredient",
      },
      {
        id: 4,
        action: "CurateIngredient",
      },
      {
        id: 5,
        action: "DeleteIngredient",
      },
      {
        id: 6,
        action: "ListSpecs",
      },
      {
        id: 7,
        action: "CreateSpec",
      },
      {
        id: 8,
        action: "EditSpec",
      },
      {
        id: 9,
        action: "CurateSpec",
      },
      {
        id: 10,
        action: "DeleteSpec",
      },
      {
        id: 11,
        action: "EditUser",
      },
      {
        id: 12,
        action: "AddReview",
      },
      {
        id: 13,
        action: "ModerateReviews",
      },
      {
        id: 14,
        action: "ModifyUserPermissions",
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Permissions", null, {})
  },
}

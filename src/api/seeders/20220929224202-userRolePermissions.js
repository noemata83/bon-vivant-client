"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("UserRolePermissions", [
      {
        userRoleId: 1,
        permissionId: 1,
      },
      {
        userRoleId: 1,
        permissionId: 2,
      },
      {
        userRoleId: 1,
        permissionId: 3,
      },
      {
        userRoleId: 1,
        permissionId: 4,
      },
      {
        userRoleId: 1,
        permissionId: 5,
      },
      {
        userRoleId: 1,
        permissionId: 6,
      },
      {
        userRoleId: 1,
        permissionId: 7,
      },
      {
        userRoleId: 1,
        permissionId: 8,
      },
      {
        userRoleId: 1,
        permissionId: 9,
      },
      {
        userRoleId: 1,
        permissionId: 10,
      },
      {
        userRoleId: 1,
        permissionId: 11,
      },
      {
        userRoleId: 1,
        permissionId: 12,
      },
      {
        userRoleId: 1,
        permissionId: 13,
      },
      {
        userRoleId: 1,
        permissionId: 14,
      },
      {
        userRoleId: 2,
        permissionId: 1,
      },
      {
        userRoleId: 2,
        permissionId: 2,
      },
      {
        userRoleId: 2,
        permissionId: 3,
      },
      {
        userRoleId: 2,
        permissionId: 4,
      },
      {
        userRoleId: 2,
        permissionId: 5,
      },
      {
        userRoleId: 2,
        permissionId: 6,
      },
      {
        userRoleId: 2,
        permissionId: 7,
      },
      {
        userRoleId: 2,
        permissionId: 8,
      },
      {
        userRoleId: 2,
        permissionId: 9,
      },
      {
        userRoleId: 2,
        permissionId: 10,
      },
      {
        userRoleId: 2,
        permissionId: 12,
      },
      {
        userRoleId: 2,
        permissionId: 13,
      },
      {
        userRoleId: 3,
        permissionId: 1,
      },
      {
        userRoleId: 3,
        permissionId: 6,
      },
      {
        userRoleId: 3,
        permissionId: 7,
      },
      {
        userRoleId: 3,
        permissionId: 8,
      },
      {
        userRoleId: 3,
        permissionId: 12,
      },
      {
        userRoleId: 4,
        permissionId: 1,
      },
      {
        userRoleId: 4,
        permissionId: 6,
      },
      {
        userRoleId: 4,
        permissionId: 12,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserRolePermissions", null, {})
  },
}

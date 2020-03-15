"use strict"
const uuid = require("uuid")
const bcrypt = require("bcrypt")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user1password = await bcrypt.hash("azathoth", 10)
    const user2password = await bcrypt.hash("password", 10)
    const user3password = await bcrypt.hash("grumpsalot", 10)
    return queryInterface.bulkInsert("Users", [
      {
        id: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        username: "noema",
        email: "noemata83@gmail.com",
        password: user1password
      },
      {
        id: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        username: "twmckinney",
        email: "twmckinney83@gmail.com",
        password: user2password
      },
      {
        id: uuid.v4(),
        username: "grumpygus",
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "gottheblues@grumpy.gus",
        password: user3password
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {})
  }
}

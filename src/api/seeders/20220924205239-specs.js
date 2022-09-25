"use strict"

const uuid = require("uuid")

async function fetchIngredientId(queryInterface, slug) {
  const [result] = await queryInterface.sequelize.query(
    `SELECT "id" FROM "Ingredients" WHERE "Ingredients"."slug" = '${slug}'`
  )
  return result[0].id
}

async function fetchGlasswareId(queryInterface, name) {
  const [result] = await queryInterface.sequelize.query(
    `SELECT "id" FROM "Glasswares" WHERE "Glasswares"."name" = '${name}'`
  )
  return result[0].id
}

async function fetchDependencies(queryInterface, Sequelize) {
  const coupeId = await fetchGlasswareId(queryInterface, "Coupe")
  const martiniGlassId = await fetchGlasswareId(queryInterface, "Martini")
  const doubleRocksId = await fetchGlasswareId(queryInterface, "Double Rocks")

  // martini
  const ginId = await fetchIngredientId(queryInterface, "gin")
  const dryVermouthId = await fetchIngredientId(queryInterface, "dry-vermouth")
  const lemonTwistId = await fetchIngredientId(queryInterface, "lemon-twist")
  const orangeBittersId = await fetchIngredientId(
    queryInterface,
    "orange-bitters"
  )

  // manhattan
  const ryeId = await await fetchIngredientId(queryInterface, "rye")
  const sweetVermouthId = await fetchIngredientId(
    queryInterface,
    "sweet-vermouth"
  )
  const angosturaId = await fetchIngredientId(
    queryInterface,
    "angostura-bitters"
  )
  const cherryId = await fetchIngredientId(queryInterface, "brandied-cherry")

  // negroni
  const campariId = await fetchIngredientId(queryInterface, "campari")
  const orangePeelId = await fetchIngredientId(queryInterface, "orange-peel")

  // daiquiri
  const lightRumId = await fetchIngredientId(queryInterface, "light-rum")
  const limeJuiceId = await fetchIngredientId(queryInterface, "lime-juice")
  const simpleSyrupId = await fetchIngredientId(queryInterface, "simple-syrup")

  return {
    ginId,
    dryVermouthId,
    lemonTwistId,
    sweetVermouthId,
    ryeId,
    lemonTwistId,
    cherryId,
    campariId,
    orangeBittersId,
    lightRumId,
    limeJuiceId,
    simpleSyrupId,
    coupeId,
    martiniGlassId,
    doubleRocksId,
    angosturaId,
    orangePeelId,
  }
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const dependencies = await fetchDependencies(queryInterface)

    const manhattanId = uuid.v4()
    const martiniId = uuid.v4()
    const negroniId = uuid.v4()
    const daiquiriId = uuid.v4()

    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.bulkInsert(
        "Specs",
        [
          {
            id: manhattanId,
            name: "Manhattan",
            slug: "manhattan",
            description: "The classic",
            directions:
              "Stir ingredients with ice and strain. Garnish with the cherry.",
            dateAdded: new Date(Date.now()).toISOString(),
            glasswareId: dependencies.coupeId,
            preparationType: "STIRRED",
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
        ],
        { transaction: t }
      )
      await queryInterface.bulkInsert(
        "SpecIngredients",
        [
          {
            id: uuid.v4(),
            quantity: 2.5,
            measure: "OZ",
            ingredientId: dependencies.ryeId,
            specId: manhattanId,
            canSub: false,
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
          {
            id: uuid.v4(),
            quantity: 0.75,
            measure: "OZ",
            ingredientId: dependencies.sweetVermouthId,
            specId: manhattanId,
            canSub: false,
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
          {
            id: uuid.v4(),
            quantity: 2,
            measure: "DS",
            ingredientId: dependencies.angosturaId,
            specId: manhattanId,
            canSub: false,
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
          {
            id: uuid.v4(),
            quantity: 1,
            ingredientId: dependencies.cherryId,
            specId: manhattanId,
            canSub: false,
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
        ],
        { transaction: t }
      )
    })
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.bulkInsert(
        "Specs",
        [
          {
            id: daiquiriId,
            name: "Daiquiri",
            slug: "daiquiri",
            description: "A quintessential rum sour.",
            directions: "Shake with ice.Strain into a chilled coupe.",
            dateAdded: new Date(Date.now()).toISOString(),
            glasswareId: dependencies.coupeId,
            preparationType: "SHAKEN",
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
        ],
        { transaction: t }
      )
      await queryInterface.bulkInsert(
        "SpecIngredients",
        [
          {
            id: uuid.v4(),
            quantity: 2,
            measure: "OZ",
            ingredientId: dependencies.lightRumId,
            specId: daiquiriId,
            canSub: false,
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
          {
            id: uuid.v4(),
            quantity: 1,
            measure: "OZ",
            ingredientId: dependencies.limeJuiceId,
            specId: daiquiriId,
            canSub: false,
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
          {
            id: uuid.v4(),
            quantity: 0.5,
            measure: "OZ",
            ingredientId: dependencies.simpleSyrupId,
            specId: daiquiriId,
            canSub: false,
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
        ],
        { transaction: t }
      )
    })
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.bulkInsert(
        "Specs",
        [
          {
            id: martiniId,
            name: "Martini",
            slug: "martini",
            description:
              "One of the most well-known cocktails is a gin showcase.",
            directions: "Stir with ice.Strain into a chilled martini glass.",
            dateAdded: new Date(Date.now()).toISOString(),
            glasswareId: dependencies.martiniGlassId,
            preparationType: "STIRRED",
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
        ],
        { transaction: t }
      )
      await queryInterface.bulkInsert(
        "SpecIngredients",
        [
          {
            id: uuid.v4(),
            quantity: 2.5,
            measure: "OZ",
            ingredientId: dependencies.ginId,
            specId: martiniId,
            canSub: false,
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
          {
            id: uuid.v4(),
            quantity: 0.75,
            measure: "OZ",
            ingredientId: dependencies.dryVermouthId,
            specId: martiniId,
            canSub: false,
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
          {
            id: uuid.v4(),
            quantity: 1,
            measure: "DS",
            ingredientId: dependencies.orangeBittersId,
            specId: martiniId,
            canSub: false,
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
          {
            id: uuid.v4(),
            quantity: 1,
            ingredientId: dependencies.lemonTwistId,
            specId: martiniId,
            canSub: false,
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
        ],
        { transaction: t }
      )
    })
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.bulkInsert(
        "Specs",
        [
          {
            id: negroniId,
            name: "Negroni",
            slug: "negroni",
            description: "Spring in a glass.",
            directions: "Stir with ice.Strain into a double rocks glass.",
            dateAdded: new Date(Date.now()).toISOString(),
            glasswareId: dependencies.doubleRocksId,
            preparationType: "STIRRED",
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
        ],
        { transaction: t }
      )
      await queryInterface.bulkInsert(
        "SpecIngredients",
        [
          {
            id: uuid.v4(),
            quantity: 1.5,
            measure: "OZ",
            ingredientId: dependencies.ginId,
            specId: negroniId,
            canSub: false,
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
          {
            id: uuid.v4(),
            quantity: 1,
            measure: "OZ",
            ingredientId: dependencies.campariId,
            specId: negroniId,
            canSub: false,
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
          {
            id: uuid.v4(),
            quantity: 1,
            measure: "OZ",
            ingredientId: dependencies.sweetVermouthId,
            specId: negroniId,
            canSub: false,
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
          {
            id: uuid.v4(),
            quantity: 1,
            ingredientId: dependencies.orangePeelId,
            specId: negroniId,
            canSub: false,
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
        ],
        { transaction: t }
      )
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.bulkDelete("SpecIngredients", null, {
        transaction: t,
      })
      await queryInterface.bulkDelete("Specs", null, { transaction: t })
    })
  },
}

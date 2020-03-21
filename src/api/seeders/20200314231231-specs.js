"use strict"
const uuid = require("uuid")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ingredients = await queryInterface.sequelize.query(
      `SELECT id, slug FROM public."Ingredients";`
    )
    const rittenhouseId = ingredients[0].find(
      ingredient => ingredient.slug === "rittenhouse-rye"
    ).id
    const martinirossoId = ingredients[0].find(
      ingredient => ingredient.slug === "martini-&-rossi-rosso-vermouth"
    ).id
    const angosturaId = ingredients[0].find(
      ingredient => ingredient.slug === "angostura-bitters"
    ).id
    const luxardoCherryId = ingredients[0].find(
      ingredient => ingredient.slug === "luxardo-maraschino-cherry"
    ).id
    const buffaloTraceId = ingredients[0].find(
      ingredient => ingredient.slug === "buffalo-trace-bourbon-whiskey"
    ).id
    const florDeCanaId = ingredients[0].find(
      ingredient => ingredient.slug === "flor-de-cana-extra-dry-white-rum"
    ).id
    const limeJuiceId = ingredients[0].find(
      ingredient => ingredient.slug === "lime-juice"
    ).id
    const simpleSyrupId = ingredients[0].find(
      ingredient => ingredient.slug === "simple-syrup"
    ).id
    const manhattanId = uuid.v4()
    const bourbonManhattanId = uuid.v4()
    const daiquiriId = uuid.v4()
    await queryInterface.bulkInsert("Specs", [
      {
        id: manhattanId,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Manhattan",
        slug: "manhattan",
        description: "The classic.",
        directions:
          "Build liquid ingredients in a mixing glass with ice. Stir for twenty seconds, then strain into a chilled cocktail class or a rocks glass with ice, as desired. Garnish with the cherry.",
        riffOnId: null
      },
      {
        id: bourbonManhattanId,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Bourbon Manhattan",
        slug: "bourbon-manhattan",
        description: "The bourbon variation on the classic.",
        directions:
          "Build liquid ingredients in a mixing glass with ice. Stir for twenty seconds, then strain into a chilled cocktail class or a rocks glass with ice, as desired. Garnish with the cherry.",
        riffOnId: manhattanId
      },
      {
        id: daiquiriId,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Daiquiri",
        slug: "daiquiri",
        description:
          "The quintessential rum cocktail; surprisingly sophisticated for its modest ingredient list. With a good rum, divine.",
        directions:
          "Combine rum, syrup, and lime juice in a shaker. Shake for twenty seconds with ice and strain  into a chilled cocktail glass."
      }
    ])
    return queryInterface.bulkInsert("SpecIngredients", [
      {
        id: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ingredientId: rittenhouseId,
        specId: manhattanId,
        quantity: 2.0,
        measure: "OZ",
        canSub: true
      },
      {
        id: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ingredientId: martinirossoId,
        specId: manhattanId,
        quantity: 1.0,
        measure: "OZ",
        canSub: true
      },
      {
        id: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ingredientId: angosturaId,
        specId: manhattanId,
        quantity: 2.0,
        measure: "DS",
        canSub: true
      },
      {
        id: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ingredientId: luxardoCherryId,
        specId: manhattanId,
        quantity: 1.0,
        canSub: false
      },
      {
        id: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ingredientId: buffaloTraceId,
        specId: bourbonManhattanId,
        quantity: 2.0,
        measure: "OZ",
        canSub: true
      },
      {
        id: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ingredientId: martinirossoId,
        specId: bourbonManhattanId,
        quantity: 1.0,
        measure: "OZ",
        canSub: true
      },
      {
        id: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ingredientId: angosturaId,
        specId: bourbonManhattanId,
        quantity: 2.0,
        measure: "DS",
        canSub: true
      },
      {
        id: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ingredientId: luxardoCherryId,
        specId: bourbonManhattanId,
        quantity: 1.0,
        canSub: false
      },
      {
        id: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ingredientId: florDeCanaId,
        specId: daiquiriId,
        quantity: 2.0,
        measure: "OZ",
        canSub: true
      },
      {
        id: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ingredientId: limeJuiceId,
        specId: daiquiriId,
        quantity: 0.75,
        measure: "OZ",
        canSub: false
      },
      {
        id: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ingredientId: simpleSyrupId,
        specId: daiquiriId,
        quantity: 0.5,
        measure: "OZ",
        canSub: false
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("SpecIngredients", null, {})
    return queryInterface.bulkDelete("Specs", null, {})
  }
}

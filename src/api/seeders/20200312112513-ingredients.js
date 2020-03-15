"use strict"
const uuid = require("uuid")

module.exports = {
  up: async queryInterface => {
    const families = await queryInterface.sequelize.query(
      `SELECT id, slug FROM public."IngredientFamilies";`
    )
    const ryeWhiskey = families[0].find(family => family.slug === "rye-whiskey")
    const sweetVermouth = families[0].find(
      family => family.slug === "sweet-vermouth"
    )
    const aromaticBitters = families[0].find(
      family => family.slug === "aromatic-bitters"
    )
    const cherryGarnish = families[0].find(
      family => family.slug === "cherry-garnish"
    )
    const bourbonWhiskey = families[0].find(
      family => family.slug === "bourbon-whiskey"
    )
    const lightRum = families[0].find(family => family.slug === "light-rum")
    const citrusJuice = families[0].find(
      family => family.slug === "citrus-juice"
    )
    const sweetener = families[0].find(family => family.slug === "sweetener")
    const rittenhouseId = uuid.v4()
    const martinirossoId = uuid.v4()
    const angosturaId = uuid.v4()
    const maraschinoCherryId = uuid.v4()
    const buffaloTraceId = uuid.v4()
    const florDeCanaWhiteId = uuid.v4()
    const simpleSyrupId = uuid.v4()
    const limeJuiceId = uuid.v4()
    const insertResults = await queryInterface.bulkInsert("Ingredients", [
      {
        id: rittenhouseId,
        name: "Rittenhouse Rye",
        slug: "rittenhouse-rye",
        description:
          "Rittenhouse is a brand of rye whiskey made by the Heaven Hill distillery in Bardstown, Kentucky. Rittenhouse is a Pennsylvania style rye whiskey, which is richer and more full bodied than the Maryland style.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: martinirossoId,
        name: "Martini & Rossi Rosso Vermouth",
        slug: "martini-&-rossi-rosso-vermouth",
        description:
          "Developed in 1863 by Luigi Rossi, this sweet vermouth uses a variety of italian herbs.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: angosturaId,
        name: "Angostura Bitters",
        slug: "angostura-bitters",
        description: "An ubiquitous aromatic bitters made in Trinidad.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: maraschinoCherryId,
        name: "Luxardo Maraschino Cherry",
        slug: "luxardo-maraschino-cherry",
        description: "A cherry soaked in maraschino by the Luxardo company",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: florDeCanaWhiteId,
        name: "Flor de Cana Extra Dry White Rum",
        slug: "flor-de-cana-extra-dry-white-rum",
        description:
          "A light rum from Nicaragua, aged for four years and filtered for color. Extremely smooth.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: simpleSyrupId,
        name: "Simple Syrup",
        slug: "simple-syrup",
        description:
          "A 1:1 mixture of sugar and water used for sweetening cocktails.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: limeJuiceId,
        name: "Lime Juice",
        slug: "lime-juice",
        description: "The juice of a lime.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: buffaloTraceId,
        name: "Buffalo Trace Bourbon Whiskey",
        slug: "buffalo-trace-bourbon-whiskey",
        description:
          "The Buffalo Trace distillery uses two mash bills (the blend of grains used to produce their whiskies): Mash Bill #1 is around 80% corn, with some rye and barley. The Buffalo Trace brand uses this mash bill.",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    return queryInterface.bulkInsert("IngredientsAndFamilies", [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        IngredientId: rittenhouseId,
        IngredientFamilyId: ryeWhiskey.id
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        IngredientId: martinirossoId,
        IngredientFamilyId: sweetVermouth.id
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        IngredientId: angosturaId,
        IngredientFamilyId: aromaticBitters.id
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        IngredientId: maraschinoCherryId,
        IngredientFamilyId: cherryGarnish.id
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        IngredientId: florDeCanaWhiteId,
        IngredientFamilyId: lightRum.id
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        IngredientId: simpleSyrupId,
        IngredientFamilyId: sweetener.id
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        IngredientId: limeJuiceId,
        IngredientFamilyId: citrusJuice.id
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        IngredientId: buffaloTraceId,
        IngredientFamilyId: bourbonWhiskey.id
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("IngredientsAndFamilies", null, {})
    return queryInterface.bulkDelete("Ingredients", null, {})
  }
}

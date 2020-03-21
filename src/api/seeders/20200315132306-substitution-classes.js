"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const specs = await queryInterface.sequelize.query(
      `SELECT id, slug FROM public."Specs";`
    )
    const manhattanSpecId = specs[0].find(spec => spec.slug === "manhattan").id
    const bourbonManhattanSpecId = specs[0].find(
      spec => spec.slug === "bourbon-manhattan"
    ).id
    const daiquiriSpecId = specs[0].find(spec => spec.slug === "daiquiri").id
    const ingredients = await queryInterface.sequelize.query(
      `SELECT id, slug FROM public."Ingredients"`
    )
    const rittenhouseId = ingredients[0].find(
      ingredient => ingredient.slug === "rittenhouse-rye"
    ).id
    const martiniRossiRossoId = ingredients[0].find(
      ingredient => ingredient.slug === "martini-&-rossi-rosso-vermouth"
    ).id
    const angosturaId = ingredients[0].find(
      ingredient => ingredient.slug === "angostura-bitters"
    ).id
    const buffaloTraceId = ingredients[0].find(
      ingredient => ingredient.slug === "buffalo-trace-bourbon-whiskey"
    ).id
    const florDeCanaId = ingredients[0].find(
      ingredient => ingredient.slug === "flor-de-cana-extra-dry-white-rum"
    ).id
    const specIngredients = await queryInterface.sequelize.query(
      `SELECT id, "specId", "ingredientId" FROM public."SpecIngredients";`
    )
    const manhattanRyeId = specIngredients[0].find(
      specIngredient =>
        specIngredient.specId === manhattanSpecId &&
        specIngredient.ingredientId === rittenhouseId
    ).id
    const manhattanVermouthId = specIngredients[0].find(
      specIngredient =>
        specIngredient.specId === manhattanSpecId &&
        specIngredient.ingredientId === martiniRossiRossoId
    ).id
    const manhattanAngosturaId = specIngredients[0].find(
      specIngredient =>
        specIngredient.specId === manhattanSpecId &&
        specIngredient.ingredientId === angosturaId
    ).id
    const bourbonManhattanBourbonId = specIngredients[0].find(
      specIngredient =>
        specIngredient.specId === bourbonManhattanSpecId &&
        specIngredient.ingredientId === buffaloTraceId
    ).id
    const bourbonManhattanVermouthId = specIngredients[0].find(
      specIngredient =>
        specIngredient.specId === bourbonManhattanSpecId &&
        specIngredient.ingredientId === martiniRossiRossoId
    ).id
    const bourbonManhattanAngosturaId = specIngredients[0].find(
      specIngredient =>
        specIngredient.specId === bourbonManhattanSpecId &&
        specIngredient.ingredientId === angosturaId
    ).id
    const daiquiriRumId = specIngredients[0].find(
      specIngredient =>
        specIngredient.specId === daiquiriSpecId &&
        specIngredient.ingredientId === florDeCanaId
    ).id
    const ingredientFamilies = await queryInterface.sequelize.query(
      `SELECT id, slug FROM public."IngredientFamilies"`
    )
    const ryeWhiskeyId = ingredientFamilies[0].find(
      family => family.slug === "rye-whiskey"
    ).id
    const vermouthId = ingredientFamilies[0].find(
      family => family.slug === "sweet-vermouth"
    ).id
    const aromaticBittersId = ingredientFamilies[0].find(
      family => family.slug === "aromatic-bitters"
    ).id
    const bourbonWhiskeyId = ingredientFamilies[0].find(
      family => family.slug === "bourbon-whiskey"
    ).id
    const lightRumId = ingredientFamilies[0].find(
      family => family.slug === "light-rum"
    ).id
    return queryInterface.bulkInsert("IngredientSubstitutionClasses", [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        SpecingredientId: manhattanRyeId,
        IngredientFamilyId: ryeWhiskeyId
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        SpecingredientId: manhattanVermouthId,
        IngredientFamilyId: vermouthId
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        SpecingredientId: manhattanAngosturaId,
        IngredientFamilyId: aromaticBittersId
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        SpecingredientId: bourbonManhattanBourbonId,
        IngredientFamilyId: bourbonWhiskeyId
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        SpecingredientId: bourbonManhattanVermouthId,
        IngredientFamilyId: vermouthId
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        SpecingredientId: bourbonManhattanAngosturaId,
        IngredientFamilyId: aromaticBittersId
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        SpecingredientId: daiquiriRumId,
        IngredientFamilyId: lightRumId
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("IngredientSubstitutionClasses", null, {})
    // return queryInterface.dropTable("IngredientSubstitutionClasses")
  }
}

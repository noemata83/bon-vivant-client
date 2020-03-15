"use strict"
const uuid = require("uuid")

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("IngredientFamilies", [
      {
        id: uuid.v4(),
        name: "Rye Whiskey",
        slug: "rye-whiskey",
        createdAt: new Date(),
        updatedAt: new Date(),
        description:
          "Rye is an American whiskey stilled from rye and other grains."
      },
      {
        id: uuid.v4(),
        name: "Sweet Vermouth",
        slug: "sweet-vermouth",
        createdAt: new Date(),
        updatedAt: new Date(),
        description:
          "Sweet vermouth is an aromatized, slightly fortified red wine with a moderate sweetness balanced by a bitter aspect."
      },
      {
        id: uuid.v4(),
        name: "Aromatic Bitters",
        slug: "aromatic-bitters",
        createdAt: new Date(),
        updatedAt: new Date(),
        description:
          "An infusion of roots, bark, herbs and spices, usually in alcohol, that are legally classified as non-potable."
      },
      {
        id: uuid.v4(),
        name: "Cherry Garnish",
        slug: "cherry-garnish",
        createdAt: new Date(),
        updatedAt: new Date(),
        description:
          "A type of garnish using a cherry, either soaked in brandy or maraschino."
      },
      {
        id: uuid.v4(),
        name: "Light Rum",
        slug: "light-rum",
        createdAt: new Date(),
        updatedAt: new Date(),
        description:
          "Light rum, also called white or silver rum is a rum that is clear in color. It does not mean that the spirit is unaged -- color due to aging can be removed from light rums with activated charcoal.\nLight rums are typically delicate and aromatic. They are also a popular base spirit to flavor, as with vodka."
      },
      {
        id: uuid.v4(),
        name: "Citrus Juice",
        slug: "citrus-juice",
        createdAt: new Date(),
        updatedAt: new Date(),
        description:
          "Any of a variety of juices of the citrus fruit commonly added to cocktails to provide flavor and acidity."
      },
      {
        id: uuid.v4(),
        name: "Sweetener",
        slug: "sweetener",
        createdAt: new Date(),
        updatedAt: new Date(),
        description:
          "Any syrup, sugar, or similar substance added to a cocktail to provide sweetness. E.g., simple syrup."
      },
      {
        id: uuid.v4(),
        name: "Bourbon Whiskey",
        slug: "bourbon-whiskey",
        createdAt: new Date(),
        updatedAt: new Date(),
        description:
          "Bourbon is the name of a class of distilled spirits made primarily from corn, and regulated by Federal law with regards to its composition, distillation, aging, and labelling requirements."
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("IngredientFamilies", null, {})
  }
}

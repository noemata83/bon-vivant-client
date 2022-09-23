"use strict"
const uuid = require("uuid")
const slugify = require("slugify")

module.exports = {
  async up(queryInterface, Sequelize) {
    const whiskeyId = uuid.v4()
    const vodkaId = uuid.v4()
    const ginId = uuid.v4()
    const brandyId = uuid.v4()
    const liqueurId = uuid.v4()
    const mezcalId = uuid.v4()
    const tequilaId = uuid.v4()
    const rumId = uuid.v4()
    const fortifiedWineId = uuid.v4()
    const bittersId = uuid.v4()
    const garnishId = uuid.v4()
    const sweetenerId = uuid.v4()
    const fruitJuiceId = uuid.v4()
    const vermouthId = uuid.v4()
    const citrusJuiceId = uuid.v4()
    await queryInterface.bulkInsert("Ingredients", [
      {
        name: "Whiskey",
        id: whiskeyId,
        slug: "whiskey",
        proof: 80,
        description: "Any of various grain spirits.",
        parentId: null,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Vodka",
        id: vodkaId,
        slug: "vodka",
        proof: 80,
        description: "A neutral spirit.",
        parentId: null,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Gin",
        id: ginId,
        slug: "gin",
        proof: 80,
        description:
          "A neutral spirit infused with a complex blend of botanicals, often including juniper.",
        parentId: null,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Brandy",
        id: brandyId,
        slug: "brandy",
        proof: 80,
        description:
          "Any of various spirits derived from distilled grape or other fruit-derived alcohol.",
        parentId: null,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Liqueur",
        id: liqueurId,
        slug: "liqueur",
        description:
          "A (typically lower proof) decoction used to give cocktails a distinctive flavor. Sometimes derived from other types of alcohol.",
        proof: 48,
        parentId: null,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Mezcal",
        id: mezcalId,
        slug: "mezcal",
        proof: 80,
        description:
          "A liquor derived from the agave plant. The family prominently includes tequila.",
        parentId: null,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Tequila",
        id: tequilaId,
        slug: "tequila",
        proof: 80,
        description: "A popular variety of mescal or agave-based spirit.",
        parentId: mezcalId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Rum",
        id: rumId,
        slug: "rum",
        proof: 80,
        description:
          "An extremely diverse genus of spirit derived from sugarcane juice or molasses.",
        parentId: null,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Fortified Wine",
        id: fortifiedWineId,
        slug: "fortified-wine",
        proof: 38,
        description:
          "A wine which has a distilled spirit added to it to increase its alcohol content.",
        parentId: null,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Bitters",
        id: bittersId,
        slug: "bitters",
        proof: 89,
        description:
          "The name for any of a variety of flavoring agents added to cocktails that typically raise its bitterness or add a lifting or blending element.",
        parentId: null,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Fruit Juice",
        id: fruitJuiceId,
        slug: "fruit-juice",
        proof: 0,
        description: "Any variety of fruit juice.",
        parentId: null,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Sweetener",
        id: sweetenerId,
        slug: "sweetener",
        proof: 0,
        description:
          "A syrup added to a cocktail to sweeten it and make it more palatable.",
        parentId: null,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },

      {
        name: "Garnish",
        id: garnishId,
        slug: "garnish",
        proof: 0,
        description:
          "Something added to a drink for decoration, or to enhance the nose or otherwise accent the liquid content.",
        parentId: null,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Scotch",
        id: uuid.v4(),
        slug: "scotch",
        proof: 80,
        description:
          "A variety of distilled whisky hailing from Scotland, derived from either malt or grain.",
        parentId: whiskeyId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Bourbon",
        id: uuid.v4(),
        slug: "bourbon",
        proof: 80,
        description: "A type of American whiskey, primarily made from corn.",
        parentId: whiskeyId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Irish Whiskey",
        id: uuid.v4(),
        slug: "irish-whiskey",
        proof: 80,
        description:
          "Any whiskey made in Ireland, using a variety of cereal grains.",
        parentId: whiskeyId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Rye",
        id: uuid.v4(),
        slug: "rye",
        proof: 80,
        description:
          "A grain whiskey which typically contains at least 51% rye in its mash bill.",
        parentId: whiskeyId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "London Dry Gin",
        id: uuid.v4(),
        slug: "london-dry-gin",
        proof: 80,
        description:
          "The classic, juniper-forward, citrus-peel heavy standard style of gin.",
        parentId: ginId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Plymouth Gin",
        id: uuid.v4(),
        slug: "plymouth-gin",
        proof: 82,
        description:
          "By law, made only in Plymouth, England. Softer and sweeter than London Dry, with an almost oily mouthfeel.",
        parentId: ginId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "New Western Dry Gin",
        id: uuid.v4(),
        slug: "new-western-dry-gin",
        proof: 80,
        description:
          "These gins tend to downplay the notes of juniper, and emphasize other botanicals. The variety of flavor profiles is wide.",
        parentId: ginId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Old Tom Gin",
        id: uuid.v4(),
        slug: "old-tom-gin",
        proof: 80,
        description:
          "A much sweeter variety of gin that often emphasizes strong botanicals to overcome its underlying harshness.",
        parentId: ginId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Genever",
        id: uuid.v4(),
        slug: "genever",
        proof: 80,
        description:
          "The forefather of gin. Made from malt wine, with a whiskey-like malt flavor profile.",
        parentId: ginId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Cognac",
        id: uuid.v4(),
        slug: "cognac",
        proof: 80,
        description:
          "A variety of brandy named for its origin in Cognac, France. Made from a specified set of grape varietals prominently including Ugni Blanc.",
        parentId: brandyId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Applejack",
        id: uuid.v4(),
        slug: "applejack",
        proof: 80,
        description:
          "A type of fruit brandy made from apples, popular in the late 19th and early 20th centuries and featuring prominently in many classic cocktails.",
        parentId: brandyId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Pisco",
        id: uuid.v4(),
        slug: "pisco",
        proof: 86,
        description:
          "A grape-based brandy produced in the winemaking regions of Peru and Chile.",
        parentId: brandyId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Herbal Liqueur",
        id: uuid.v4(),
        slug: "herbal-liqueur",
        proof: 48,
        description:
          "A variety of liqueur produced from any number of combinations of herbs.",
        parentId: liqueurId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Fruit Liqueur",
        id: uuid.v4(),
        slug: "fruit-liqueur",
        proof: 48,
        description:
          "A variety of liqueur flavored with fruit, sometimes difficult to distinguish from fruit brandy or eau-de-vie, but packing more sugar.",
        parentId: liqueurId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Absinthe",
        id: uuid.v4(),
        slug: "absinthe",
        proof: 110,
        description:
          "A high-alcohol wormwood-based liqueur that prominently features flavors of anise, fennel, and medicinal or culinary herbs.",
        parentId: liqueurId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Blanco Tequila",
        id: uuid.v4(),
        slug: "blanco-tequila",
        proof: 80,
        description:
          "An unaged tequila, typically clear but harsher in flavor than its aged counterparts. The most agave-forward style of tequila.",
        parentId: tequilaId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Reposado Tequila",
        id: uuid.v4(),
        slug: "reposado-tequila",
        proof: 80,
        description:
          "A variety of tequila that is rested for 2-11 months, with a warmer and easier finish than the blanco style.",
        parentId: tequilaId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Añejo Tequila",
        id: uuid.v4(),
        slug: "anejo-tequila",
        proof: 80,
        description:
          "Tequila that has been aged in oak barrels for one to three years. Intended to be sipped neat.",
        parentId: tequilaId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "English-style Rum",
        id: uuid.v4(),
        slug: "english-style-rum",
        proof: 80,
        description:
          "A type of rum typically made from molasses using a copper pot still and produced mainly in the West Indies and surrounding areas.",
        parentId: rumId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Spanish-style Rum",
        id: uuid.v4(),
        slug: "spanish-style-rum",
        proof: 80,
        description:
          "A smoother, less funky style of rum than its English counterpart.",
        parentId: rumId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Jamaican Rum",
        id: uuid.v4(),
        slug: "jamaican-rum",
        proof: 80,
        description:
          "Sometimes called 'Navy rum,' this style has a very distinctive, funky complexity.",
        parentId: rumId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Rhum Agricole",
        id: uuid.v4(),
        slug: "rhum-agricole",
        proof: 80,
        description:
          "A distinct, grassy, earth style of rum typically produced in the French West Indies from sugarcane juice.",
        parentId: rumId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Sweet Vermouth",
        id: vermouthId,
        slug: "sweet-vermouth",
        proof: 40,
        description:
          "A fortified wine made from a blend of white wines mixed with sugar, botanicals, and a neutral spirit.",
        parentId: fortifiedWineId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Dry Vermouth",
        id: uuid.v4(),
        slug: "dry-vermouth",
        proof: 40,
        description:
          "A fortified wine similar to sweet vermouth but with lower sugar content, originating in France",
        parentId: fortifiedWineId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Sherry",
        id: uuid.v4(),
        slug: "sherry",
        proof: 40,
        description:
          "A fortified wine from Spain, aged in wooden casks, with yeast added both to increase the alcohol content and to protect the wine from oxidation",
        parentId: fortifiedWineId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Port",
        id: uuid.v4(),
        slug: "port",
        proof: 40,
        description:
          "A desert wine made exclusively in the Duoro River valley in Portugal. Typically derived from a sweet, red wine.",
        parentId: fortifiedWineId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Aromatic bitters",
        id: uuid.v4(),
        slug: "aromatic-bitters",
        proof: 80,
        description:
          "A common variety of bitters added to cocktails in order to marry otherwise diverse flavors and ingredients. Often a blend of strong herbs and spices.",
        parentId: bittersId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Lemon Peel",
        id: uuid.v4(),
        slug: "lemon-peel",
        proof: 0,
        description:
          "Often added as a cocktail garnish to give a cocktail a sharp, crisp overtone.",
        parentId: garnishId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Orange peel",
        id: uuid.v4(),
        slug: "orange-peel",
        proof: 0,
        description: "A common cocktail garnish.",
        parentId: garnishId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Simple Syrup",
        id: uuid.v4(),
        slug: "simple-syrup",
        proof: 0,
        description:
          "A 1:1 mixture of sugar dissolved in water, used as the most common sweetener in cocktails.",
        parentId: sweetenerId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Citrus juice",
        id: citrusJuiceId,
        slug: "citrus-juice",
        proof: 0,
        description:
          "Any juice derived from a citrus fruit to give sweetness and acidity to a drink.",
        parentId: fruitJuiceId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Lemon juice",
        id: uuid.v4(),
        slug: "lemon-juice",
        proof: 0,
        description: "Juice of a lemon.",
        parentId: citrusJuiceId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Lime juice",
        id: uuid.v4(),
        slug: "lime-juice",
        proof: 0,
        description: "Juice of a lime.",
        parentId: citrusJuiceId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Grapefruit juice",
        id: uuid.v4(),
        slug: "grapefruit-juice",
        proof: 0,
        description: "Juice of a grapefruit.",
        parentId: citrusJuiceId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
      {
        name: "Pineapple juice",
        id: uuid.v4(),
        slug: "pineapple-juice",
        proof: 0,
        description: "Juice of a pineapple.",
        parentId: fruitJuiceId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },

      {
        name: "Carpano Antica Formula Vermouth",
        id: uuid.v4(),
        slug: "carpano-antica-formula-vermouth",
        proof: 0,
        description:
          "One of two vermouths produced by the Carpano company. A very complex, slightly more bitter than average sweet vermouth.",
        parentId: vermouthId,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Ingredients", null, {})
  },
}

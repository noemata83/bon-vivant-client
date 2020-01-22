import IngredientFamily from "../Ingredients/IngredientFamily.mjs"

const families = [
  {
    name: "White Rum",
    id: 1,
    description:
      "A typically clear colored, filtered rum, typically unaged or aged for less than 4 years."
  },
  {
    name: "Citrus Juice",
    id: 2,
    description:
      "Any juice from a citrus fruit; usually used to add acidity to cocktails."
  },
  {
    name: "Sweetener",
    id: 3,
    description: "Any sugar or syrup used to add sweetness to a drink. "
  },
  {
    name: "Bourbon Whiskey",
    id: 4,
    description:
      "A traditional American whiskey derived from the things that bourbon is usually made from."
  },
  { name: "Rye Whiskey", id: 5, description: "Whiskey made with rye" },
  {
    name: "Sweet Vermouth",
    id: 6,
    description:
      "A fortified, aromatized wine frequently used to add body and complexity to cocktails."
  },
  {
    name: "Dry Vermouth",
    id: 7,
    description:
      "A fortified, aromatized wine frequently used to add body and complexity to mixed drinks. Less sugar than sweet vermouth."
  },
  {
    name: "Aromatic Bitters",
    id: 8,
    description:
      "A variety of bitters that emphasizes spices such as allspice, cloves, or other aromatics to add pungency and complexity to a drink"
  },
  {
    name: "Cherry garnish",
    id: 9,
    description: "Any variety of cherry used as a garnish, such as maraschino."
  },
  {
    name: "Amaro",
    id: 10,
    description: "A broad family of appertif wines, often bitter."
  }
]

export default async () =>
  families.forEach(async fam => {
    await IngredientFamily.create(fam)
  })

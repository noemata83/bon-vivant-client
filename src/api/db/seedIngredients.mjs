import Ingredient, { IngFamily } from "../Ingredients/Ingredient.mjs"

const ingredients = [
  {
    data: {
      name: "Flor De Cana Extra Dry White Rum",
      id: 11,
      slug: "flor-de-cana-extra-dry-white-rum",
      description:
        "An aged dry rum from Nicaragua. Makes an excellent daiquiri."
    },
    meta: {
      familyId: 1
    }
  },
  {
    data: {
      name: "Lime Juice",
      id: 12,
      slug: "lime-juice",
      description: "The juice of a lime."
    },
    meta: {
      familyId: 2
    }
  },
  {
    data: {
      name: "Simple Syrup",
      id: 13,
      slug: "simple-syrup",
      description:
        "A common sweetener made from a 1:1 mixture of sugar and water"
    },
    meta: {
      familyId: 3
    }
  },
  {
    data: {
      name: "Rittenhouse Rye",
      id: 14,
      slug: "rittenhouse-rye",
      description: "A buttery, smooth bonded rye"
    },
    meta: {
      familyId: 5
    }
  },
  {
    data: {
      name: "Martini Rosso Sweet Vermouth",
      id: 15,
      slug: "martini-rosso-sweet-vermouth",
      description: "A common sweet vermouth"
    },
    meta: {
      familyId: 6
    }
  },
  {
    data: {
      name: "Angostura Bitters",
      id: 16,
      slug: "angostura-bitters",
      description:
        "A highly useful aromatic bitters made by the House of Angostura in Trinidad and Tobago."
    },
    meta: {
      familyId: 8
    }
  },
  {
    data: {
      name: "Luxardo cherry",
      id: 17,
      slug: "luxardo-cherry",
      description: "A cocktail cherry soaked in maraschino"
    },
    meta: {
      familyId: 9
    }
  },
  {
    data: {
      name: "Buffalo Trace Bourbon Whiskey",
      id: 18,
      slug: "buffalo-trace-bourbon-whiskey",
      description:
        "A sometimes hard-to-find, high quality bourbon whiskey with strong notes of mint"
    },
    meta: {
      familyId: 4
    }
  }
]

export default async () => {
  ingredients.forEach(async ingredient => {
    const newIngredient = await Ingredient.create(ingredient.data)
    await IngFamily.create({
      ingredientId: ingredient.data.id,
      familyId: ingredient.meta.familyId
    })
  })
}

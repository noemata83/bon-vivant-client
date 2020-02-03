import { createSpec } from "../Specs/controller.mjs"

const specs = [
  {
    id: 19,
    name: "Manhattan",
    description: "A classic.",
    ingredients: [
      {
        quantity: 2.0,
        measure: "OZ",
        name: "Rittenhouse Rye",
        canSub: true,
        subWith: "Rye Whiskey"
      },
      {
        quantity: 0.5,
        measure: "OZ",
        name: "Martini Rosso Sweet Vermouth",
        canSub: true,
        subWith: "Sweet Vermouth"
      },
      {
        quantity: 1.0,
        measure: "DS",
        name: "Angostura Bitters",
        canSub: true,
        subWith: "Aromatic Bitters"
      },
      {
        quantity: 1.0,
        name: "Luxardo cherry",
        canSub: false
      }
    ],
    directions:
      "Stir ingredients in a mixing glass with ice. Strain into an ice-filled rocks glass and garnish with the cherry."
  },
  {
    name: "Daiquiri",
    description:
      "A rum-based sour with lime. Made with a good rum and the right balance of lime and simple syrup, it is an impressively complex drink for such a simple ingredient list.",
    ingredients: [
      {
        quantity: 2.0,
        measure: "OZ",
        name: "Flor de Cana Extra Dry White Rum",
        canSub: true,
        subWith: "White Rum"
      },
      {
        quantity: 1.0,
        measure: "OZ",
        name: "Lime Juice",
        canSub: false
      },
      {
        quantity: 0.5,
        measure: "OZ",
        name: "Simple Syrup",
        canSub: false
      }
    ],
    directions:
      "Shake the ingredients together with ice; strain into a chilled coupe. Optionally, garnish with a lime wedge."
  },
  {
    name: "Bourbon Manhattan",
    description: "The bourbon variation of the classic.",
    riffOn: 19,
    ingredients: [
      {
        quantity: 2.0,
        measure: "OZ",
        name: "Buffalo Trace Bourbon Whiskey",
        canSub: true,
        subWith: "Bourbon Whiskey"
      },
      {
        quantity: 0.5,
        measure: "OZ",
        name: "Martino Rossi Sweet Vermouth",
        canSub: true,
        subWith: "Sweet Vermouth"
      },
      {
        quantity: 1.0,
        measure: "DS",
        name: "Angostura Bitters",
        canSub: true,
        subWith: "Aromatic Bitters"
      },
      {
        quantity: 1.0,
        name: "Luxardo cherry",
        canSub: false
      }
    ],
    directions:
      "Stir ingredients in a mixing glass with ice. Strain into an ice-filled rocks glass and garnish with the cherry."
  }
]

export default async () => {
  specs.forEach(async spec => {
    try {
      const newSpec = await createSpec({ spec })
    } catch (err) {
      console.log(err)
    }
  })
}

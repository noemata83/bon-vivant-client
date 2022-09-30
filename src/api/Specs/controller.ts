import { Spec, Ingredient, SpecIngredient, User, Review } from "../models"

const formatSpecIngredients = (ingredient): SpecIngredient => {
  return SpecIngredient.build({
    quantity: ingredient.specIngredients?.quantity,
    measure: ingredient.specIngredients?.measure,
    canSub: ingredient.specIngredients?.canSub,
    subWith: ingredient.specIngredients?.subWith,
    ingredientId: ingredient.id,
  })
}

export const formatSpec = (spec): Spec => {
  return Spec.build({
    name: spec.name,
    slug: spec.slug,
    description: spec.description,
    directions: spec.directions,
    source: spec.source,
    id: spec.id,
    contributedBy: spec.contributedBy,
    riffOn: spec.riffOn,
    reviews: spec.reviews,
    ingredients: spec.ingredients.map(formatSpecIngredients),
  })
}

export const fetchAllSpecs = async (filter, limit) => {
  const recordFilter = formatFilter(filter)
  const specs = (
    await Spec.findAll({
      where: recordFilter,
      limit,
      include: [
        {
          model: SpecIngredient,
          include: [Ingredient],
        },
        {
          model: Spec,
          as: "riffOn",
        },
        {
          model: User,
          as: "contributedBy",
        },
        {
          model: Review,
          as: "reviews",
          include: [User],
        },
      ],
    })
  ).map((el) => el.get({ plain: true }))
  return specs
}

export const findSpec = async (where) => {
  const foundSpec = (
    await Spec.findOne({
      where,
      include: [
        { model: SpecIngredient, include: [Ingredient] },
        {
          model: User,
          as: "contributedBy",
        },
        {
          model: Review,
          as: "reviews",
          include: [User],
        },
      ],
    })
  ).toJSON()
  return foundSpec
}

export const createSpec = async ({ spec }, user) => {
  const ingredients = spec.ingredients
  const newSpec = await Spec.create({
    ...spec,
    riffOnId: spec.riffOn,
    contributedById: user.id,
  })
  ingredients.forEach(async (ingredient) => {
    const foundIngredient = await Ingredient.findOne({
      where: { name: ingredient.name },
    })
    delete ingredient.name
    try {
      await SpecIngredient.create({
        specId: newSpec.id,
        ingredientId: foundIngredient.id,
        ...ingredient,
      })
    } catch (err) {
      console.error(err)
    }
  })
  return Spec.findOne({
    where: { id: newSpec.id },
    include: [
      SpecIngredient,
      {
        model: User,
        as: "contributedBy",
      },
      {
        model: Review,
        as: "reviews",
        include: [User],
      },
    ],
  })
}

export const editSpec = async (id, updates) => {
  const specToUpdate = await Spec.findByPk(id, { include: [SpecIngredient] })
  const ingredients = specToUpdate.ingredients
  await ingredients.forEach(async (ingredient) => {
    await ingredient.destroy()
  })
  const { spec } = updates
  spec.ingredients.forEach(async (ingredient) => {
    const foundIngredient = await Ingredient.findOne({
      where: { name: ingredient.name },
    })
    delete ingredient.name
    try {
      await SpecIngredient.create({
        specId: specToUpdate.id,
        ingredientId: foundIngredient.id,
        ...ingredient,
      })
    } catch (err) {
      console.error(err)
    }
  })
  await Spec.update(
    {
      ...spec,
    },
    { where: { id } }
  )
  const theSpec = await Spec.findOne({
    where: { id },
    include: [
      Ingredient,
      {
        model: User,
        as: "contributedBy",
      },
      {
        model: Review,
        as: "reviews",
        include: [User],
      },
    ],
  })
  const formattedFoundSpec = formatSpec(theSpec)
  return formattedFoundSpec
}

export const deleteSpec = async (id) => {
  const SpecToDelete = await Spec.findByPk(id)
  try {
    const result = await Spec.destroy({ where: { id } })
    return SpecToDelete
  } catch (err) {
    throw Error("Could not delete that spec.")
  }
}

const formatFilter = (rawFilter) => {
  const filter: any = {}
  if (!rawFilter) {
    return
  }
  if (rawFilter.name) {
    filter.name = rawFilter.name
  }
  if (rawFilter.ingredients && rawFilter.ingredients.name) {
    filter["$ingredients.name$"] = rawFilter.ingredients.name
  }
  if (rawFilter.ingredients && rawFilter.ingredients.family) {
    filter["$ingredients.family.name$"] = rawFilter.ingredients.family
  }
  return filter
}

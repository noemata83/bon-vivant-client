import { sequelize, User, Ingredient, Spec, SpecIngredient } from "../models"

import { formatSpec } from "../Specs/controller"
import jwt from "jsonwebtoken"
import config from "../../../config/keys"

export const isDuplicate = (arr, id) => {
  const values = arr.map((item) => item.dataValues)
  const found = values.findIndex((item) => item == id)
  return found !== -1
}

const standardInclude = {
  include: [
    Ingredient,
    {
      model: Spec,
      as: "book",
      include: [
        {
          model: SpecIngredient,
          as: "ingredients",
          include: [Ingredient],
        },
      ],
    },
  ],
}

const setTokenCookie = (res, token) => {
  res.setHeader(
    "Set-Cookie",
    `appToken=${token}; ${
      process.env.NODE_ENV === "production" ? "Secure; " : ""
    }; Max-Age: ${1000 * 60 * 60 * 24 * 7}; Path=/`
  )
}

export const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id, {
      ...standardInclude,
    })
    user.book = user.book.map(formatSpec)
    return user
  } catch (e) {
    throw new Error(`There was a problem: ${e}`)
  }
}

export const getAllUsers = async () => {
  const users = await User.findAll({
    ...standardInclude,
  })

  return users.map((user) => {
    user.book = user.book.map(formatSpec)
    return user
  })
}

export const deleteUser = async (id) => {
  return await User.destroy({ where: { id } })
}

export const addIngredientToShelf = async (userId, ingredientId) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
    include: [Ingredient],
  })
  if (isDuplicate(user.shelf, ingredientId))
    throw new Error("Ingredient is already on your shelf.")
  try {
    await user.$add("shelf", ingredientId)
    const updatedUser = await User.findOne({
      where: {
        id: userId,
      },
      ...standardInclude,
    })
    updatedUser.book = updatedUser.book.map(formatSpec)
    return updatedUser
  } catch (e) {
    throw new Error(`Error updating ingredient shelf: ${e}`)
  }
}

export const removeIngredientFromShelf = async (userId, ingredientId) => {
  try {
    const user = await User.findByPk(userId, { include: [Ingredient] })
    const associatedIngredients = user.shelf
    const filteredIngredients = associatedIngredients.filter(
      (ingredient) => ingredient.id !== ingredientId
    )
    await user.$set("shelf", filteredIngredients)
    const updatedUser = await User.findByPk(userId, {
      ...standardInclude,
    })
    return updatedUser
  } catch (e) {
    throw new Error(`1Error updating ingredient shelf: ${e}`)
  }
}

export const addSpecToBook = async (userId, specId) => {
  try {
    const user = await User.findByPk(userId, { include: [Spec] })
    const book = user.book
    if (isDuplicate(book, specId)) {
      throw new Error("Spec is already in your cocktail book.")
    }
    await user.$add("book", specId)
    const updatedUser = await User.findByPk(userId, {
      ...standardInclude,
    })
    updatedUser.book = updatedUser.book.map(formatSpec)
    return updatedUser
  } catch (e) {
    throw new Error(`Error updating cocktail book: ${e}`)
  }
}

export const removeSpecFromBook = async (userId, specId) => {
  try {
    const user = await User.findByPk(userId, { include: [Spec] })
    const book = user.book
    const updatedBook = book.filter((spec) => spec.id !== specId)
    await user.$set("book", updatedBook)
    const updatedUser = await User.findByPk(userId, {
      ...standardInclude,
    })
    updatedUser.book = updatedUser.book.map(formatSpec)
    return updatedUser
  } catch (e) {
    throw new Error(`Error updating cocktail book: ${e}`)
  }
}

export const signUp = async (username, password, email, res) => {
  const user = await User.create({ username, password, email })
  try {
    const payload = { username: user.username, id: user.id }
    const options = { expiresIn: "7d" }
    const secret = config.SECRET
    const token = jwt.sign(payload, secret, options)
    setTokenCookie(res, token)
    return {
      ...user,
      token,
    }
  } catch (e) {
    console.log(e)
  }
}

export const login = async (username, password, res) => {
  const user = await User.findOne({ where: { username: username } })
  if (user) {
    const passwordIsValid = await user.isValidPassword(password)
    if (passwordIsValid) {
      const payload = { username: user.username, id: user.id }
      const options = { expiresIn: "7d" }
      const secret = config.SECRET
      const token = jwt.sign(payload, secret, options)
      setTokenCookie(res, token)
      return {
        token,
      }
    } else {
      throw new Error("Invalid password.")
    }
  }
}

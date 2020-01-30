import User from "./User.mjs"
import Ingredient from "../Ingredients/Ingredient.mjs"
import Spec from "../Specs/Spec.mjs"
import jwt from "jsonwebtoken"
import config from "../../../config/keys.mjs"

export const isDuplicate = (arr, id) => {
  const found = arr.findIndex(item => item == id)
  return found != -1
}

const setTokenCookie = (res, token) => {
  res.setHeader(
    "Set-Cookie",
    `appToken=${token}; ${
      process.env.NODE_ENV === "production" ? "Secure; " : ""
    }; Max-Age: ${1000 * 60 * 60 * 24 * 7}`
  )
}

export const getUserById = async id => {
  try {
    const user = await User.findByPk(id)
    return user
  } catch (e) {
    throw new Error("User not found.")
  }
}

export const getAllUsers = async () => {
  const users = await User.find({})
  return users
}

export const deleteUser = async id => {
  return await User.destroy({ where: { id } })
}

export const addIngredientToShelf = async (userId, ingredientId) => {
  const user = await User.findByPk(userId)
  if (isDuplicate(user.shelf, ingredientId))
    throw new Error("Ingredient is already on your shelf.")
  const ingredient = await Ingredient.findByPk(ingredientId)
  try {
    user.addShelfIngredient(ingredient)
    return user
  } catch (e) {
    throw new Error("Error updating ingredient shelf.")
  }
}

export const removeIngredientFromShelf = async (userId, ingredientId) => {
  try {
    const user = await User.findByPk(userId)
    const associatedIngredients = await user.getShelfIngredients()
    const filteredIngredients = associatedIngredients.filter(
      ingredient => ingredient.id !== ingredientId
    )
    await user.setShelfIngredients(filteredIngredients)
    return user
  } catch (e) {
    throw new Error("Error updating ingredient shelf.")
  }
}

export const addSpecToBook = async (userId, specId) => {
  try {
    const user = await User.findByPk(userId)
    const book = await user.getBookSpecs()
    if (isDuplicate(book, specId)) {
      throw new Error("Spec is already in your cocktail book.")
    }
    const specToAdd = await Spec.findByPk(specId)
    book.push(specToAdd)
    user.setBookSpecs(book)
  } catch (e) {
    throw new Error("Error updating cocktail book.")
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
      ...user.dataValues,
      token
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
        token
      }
    } else {
      throw new Error("Invalid password.")
    }
  }
}

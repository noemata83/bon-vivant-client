import { sequelize, User, Ingredient, Spec, SpecIngredient } from "../models"

import { formatSpec } from "../Specs/controller"
import jwt from "jsonwebtoken"
import config from "../../../config/keys"
import { UserRole } from "../models/userRole.model"
import { Permission } from "../models/permission.model"
import { USER_ROLE } from "./authorization/userRole"
import { AuthenticatedUser } from "./authorization/authorization"

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

export const addIngredientToShelf = async (
  user: AuthenticatedUser,
  ingredientId: string
) => {
  const userModel = await User.findOne({
    where: {
      id: user.id,
    },
    include: [Ingredient],
  })
  if (isDuplicate(userModel.shelf, ingredientId))
    throw new Error("Ingredient is already on your shelf.")
  try {
    await userModel.$add("shelf", ingredientId)
    const updatedUser = await User.findOne({
      where: {
        id: user.id,
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

export const addSpecToBook = async (user, specId) => {
  try {
    const userRecord = await User.findByPk(user.id, { include: [Spec] })
    const book = userRecord.book
    if (isDuplicate(book, specId)) {
      throw new Error("Spec is already in your cocktail book.")
    }
    await userRecord.$add("book", specId)
    const updatedUser = await User.findByPk(user.id, {
      ...standardInclude,
    })
    updatedUser.book = updatedUser.book.map(formatSpec)
    return updatedUser
  } catch (e) {
    throw new Error(`Error updating cocktail book: ${e}`)
  }
}

export const removeSpecFromBook = async (user, specId) => {
  try {
    const userRecord = await User.findByPk(user.id, { include: [Spec] })
    const book = userRecord.book
    const updatedBook = book.filter((spec) => spec.id !== specId)
    await userRecord.$set("book", updatedBook)
    const updatedUser = await User.findByPk(user.id, {
      ...standardInclude,
    })
    updatedUser.book = updatedUser.book.map(formatSpec)
    return updatedUser
  } catch (e) {
    throw new Error(`Error updating cocktail book: ${e}`)
  }
}

export const signUp = async (username, password, email, contribute, res) => {
  const roleId = contribute ? USER_ROLE.Contributor : USER_ROLE.Guest
  const user = await User.create({ username, password, email, roleId: roleId })
  try {
    const userRole = await UserRole.findOne({
      where: {
        id: roleId,
      },
      include: [Permission],
    })
    const payload = {
      username: user.username,
      id: user.id,
      role: userRole.toJSON(),
    }
    const options = { expiresIn: "7d" }
    const secret = config.SECRET
    const token = jwt.sign(payload, secret, options)
    setTokenCookie(res, token)
    return {
      ...user,
      token,
    }
  } catch (e) {
    console.error(e)
  }
}

export const login = async (username, password, res) => {
  const user = await User.findOne({
    where: { username: username },
    include: [{ model: UserRole, include: [Permission] }],
  })
  if (user) {
    const passwordIsValid = await user.isValidPassword(password)
    if (passwordIsValid) {
      const payload = {
        username: user.username,
        id: user.id,
        role: user.userRole.toJSON(),
      }
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

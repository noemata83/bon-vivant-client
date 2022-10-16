import { sequelize, User, Ingredient, Spec, SpecIngredient } from "../models"

import { formatSpec } from "../Specs/controller"
import jwt from "jsonwebtoken"
import config from "../../../config/keys"
import { UserRole } from "../models/userRole.model"
import { Permission } from "../models/permission.model"
import { USER_ROLE } from "./authorization/userRole"
import { AuthenticatedUser } from "./authorization/authorization"
import { ISignUpCommand } from "./commands"
import { NextApiResponse } from "next"
import { UpdateUserCollectionError, UserRepository } from "./repository"
import { RecordNotFoundError } from "../errors"
import { Err, Ok, Result } from "../../shared/adts/result/result"
import { AsyncResult } from "../../shared/adts/asyncResult/asyncResult"
import { pipeline } from "stream"
import { UserRoleRepository } from "../UserRoles/repository"

const standardInclude = [
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
]

const setTokenCookie = (res: NextApiResponse, token: string) => {
  res.setHeader(
    "Set-Cookie",
    `appToken=${token}; ${
      process.env.NODE_ENV === "production" ? "Secure; " : ""
    }; Max-Age: ${1000 * 60 * 60 * 24 * 7}; Path=/`
  )
}

export const getAllUsers = async () => {
  const users = await User.findAll({
    include: standardInclude,
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
): Promise<Result<User, UpdateUserCollectionError>> => {
  let result = new AsyncResult<User, Error>(
    UserRepository.getById(user.id, [Ingredient])
  )
    .pipe(
      (foundUser: User) =>
        UserRepository.addIngredientToShelf(foundUser, ingredientId),
      (updatedUser: User) => UserRepository.getById(updatedUser.id)
    )
    .map<User>((updatedUser: User) => {
      updatedUser.book = updatedUser.book.map(formatSpec)
      return updatedUser
    })
  return await result.resolve()
}

export const removeIngredientFromShelf: (
  user: AuthenticatedUser,
  ingredientId: string
) => Promise<Result<User, UpdateUserCollectionError>> = async (
  user: AuthenticatedUser,
  ingredientId: string
) => {
  return await new AsyncResult(UserRepository.getById(user.id, [Ingredient]))
    .pipe(
      (foundUser: User) =>
        UserRepository.removeIngredientFromShelf(foundUser, ingredientId),
      (updatedUser: User) =>
        UserRepository.getById(updatedUser.id, standardInclude)
    )
    .resolve()
}

export const addSpecToBook: (
  user: AuthenticatedUser,
  specId: string
) => Promise<
  Result<User, RecordNotFoundError | UpdateUserCollectionError>
> = async (user: AuthenticatedUser, specId: string) => {
  return new AsyncResult(UserRepository.getById(user.id, [Spec]))
    .pipe(
      (user: User) => UserRepository.addSpecToBook(user, specId),
      (user) => UserRepository.getById(user.id, standardInclude)
    )
    .map((user: User) => {
      user.book = user.book.map(formatSpec)
      return user
    })
    .resolve()
}

export const removeSpecFromBook = async (
  user: AuthenticatedUser,
  specId: string
): Promise<Result<User, RecordNotFoundError>> => {
  return new AsyncResult(UserRepository.getById(user.id, [Spec]))
    .pipe(
      (user: User) => UserRepository.removeSpecFromBook(user, specId),
      (user: User) => UserRepository.getById(user.id, standardInclude)
    )
    .map((user: User) => {
      user.book = user.book.map(formatSpec)
      return user
    })
    .resolve()
}

export const signUp = async (command: ISignUpCommand) => {
  const { username, contribute, password, email } = command
  const res = command.res
  const roleId = contribute ? USER_ROLE.Contributor : USER_ROLE.Guest
  const signUpResult: Result<User, Error> = await new AsyncResult(
    UserRepository.createUser(username, password, email, roleId)
  ).resolve()
  if (signUpResult.isErr()) {
    return signUpResult
  }
  const user = signUpResult.unwrap()
  const userRoleResult = await UserRoleRepository.getById(roleId, [Permission])
  if (userRoleResult.isErr()) {
    return userRoleResult
  }
  const payload = {
    username: user.username,
    id: user.id,
    role: userRoleResult.unwrap().toJSON(),
  }
  const options = { expiresIn: "7d" }
  const secret = config.SECRET
  const token = jwt.sign(payload, secret, options)
  setTokenCookie(res, token)
  return {
    ...user,
    token,
  }
}

export const login = async (
  username: string,
  password: string,
  res: NextApiResponse
) => {
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

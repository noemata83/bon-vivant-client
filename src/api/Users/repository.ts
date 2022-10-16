import { Err, Ok, Result } from "../../shared/adts/result/result"
import {
  RecordAlreadyExistsInCollectionError,
  RecordCouldNotBeUpdatedError,
  RecordNotFoundError,
} from "../errors"
import { User } from "../models"
import { USER_ROLE } from "./authorization/userRole"

export type UpdateUserCollectionError =
  | RecordNotFoundError
  | RecordCouldNotBeUpdatedError
  | RecordAlreadyExistsInCollectionError

export const isDuplicate = (arr: any[], id: string | number) => {
  const values = arr.map((item) => item.dataValues)
  const found = values.findIndex((item) => item == id)
  return found !== -1
}

export class UserRepository {
  static async removeIngredientFromShelf(
    user: User,
    ingredientId: string
  ): Promise<Result<User, UpdateUserCollectionError>> {
    try {
      const associatedIngredients = user.shelf
      const filteredIngredients = associatedIngredients.filter(
        (ingredient) => ingredient.id !== ingredientId
      )
      await user.$set("shelf", filteredIngredients)
      return new Ok(user)
    } catch (_) {
      return new Err(
        new RecordCouldNotBeUpdatedError(
          `User with id ${user.id} could not be updated at this time.`
        )
      )
    }
  }
  static async addIngredientToShelf(
    user: User,
    ingredientId: string
  ): Promise<Result<User, UpdateUserCollectionError>> {
    if (isDuplicate(user.shelf, ingredientId))
      return new Err(
        new RecordAlreadyExistsInCollectionError(
          "Ingredient is already on your shelf."
        )
      )
    try {
      await user.$add("shelf", ingredientId)
      return new Ok(user)
    } catch (_) {
      return new Err(
        new RecordCouldNotBeUpdatedError(
          `User with id ${user.id} could not be updated at this time.`
        )
      )
    }
  }

  static async addSpecToBook(
    user: User,
    specId: string
  ): Promise<Result<User, UpdateUserCollectionError>> {
    try {
      const book = user.book
      if (isDuplicate(book, specId)) {
        return await new Err<User, UpdateUserCollectionError>(
          new RecordAlreadyExistsInCollectionError(
            `Spec with id ${specId} is already in your cocktail book.`
          )
        )
      }
      await user.$add("book", specId)
      return new Ok<User, UpdateUserCollectionError>(user)
    } catch (_) {
      return new Err<User, UpdateUserCollectionError>(
        new RecordCouldNotBeUpdatedError(
          `User with id ${user.id} could not be updated at this time.`
        )
      )
    }
  }

  static async getById(
    id: string,
    include: any[] = []
  ): Promise<Result<User, RecordNotFoundError>> {
    const user = await User.findByPk(id, { include })
    if (!user) {
      return new Err(
        new RecordNotFoundError(`User with id ${id} was not found.`)
      )
    } else {
      return new Ok(user)
    }
  }

  static async removeSpecFromBook(
    user: User,
    specId: string
  ): Promise<Result<User, RecordCouldNotBeUpdatedError>> {
    const book = user.book
    const updatedBook = book.filter((spec) => spec.id !== specId)
    try {
      await user.$set("book", updatedBook)
      return new Ok<User, RecordCouldNotBeUpdatedError>(user)
    } catch (_) {
      return new Err<User, RecordCouldNotBeUpdatedError>(
        new RecordCouldNotBeUpdatedError(
          `Unable to update the cocktail book of user ${user.id}`
        )
      )
    }
  }

  static async createUser(
    username: string,
    password: string,
    email: string,
    roleId: USER_ROLE
  ): Promise<Result<User, Error>> {
    try {
      const user = await User.create({
        username,
        password,
        email,
        roleId: roleId,
      })
      return new Ok(user)
    } catch (err) {
      return new Err(err)
    }
  }
}

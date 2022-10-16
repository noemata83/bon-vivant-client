import { Err, Ok } from "../../shared/adts/result/result"
import { RecordCouldNotBeUpdatedError } from "../errors"
import { IIngredient } from "../models/ingredient.model"
import { IUser } from "../models/user.model"
import { AuthenticatedUser } from "./authorization/authorization"
import { addIngredientToShelf } from "./controller"
import { UserRepository } from "./repository"

describe("UserController", () => {
  describe("addIngredientToShelf", () => {
    beforeEach(() => {
      jest.resetAllMocks()
    })
    it("should return an Ok(user) if it works", async () => {
      const user: IUser = {
        id: "abcdeaf",
        username: "Phil",
        shelf: [],
        book: [],
        email: "test@test.com",
        roleId: 1,
      }
      const authenticatedUser: AuthenticatedUser = {
        ...user,
        role: {
          id: 1,
          description: "Guest",
          name: "Guest",
          permissions: [],
        },
      }
      const newIngredient: IIngredient = {
        id: "bohahaaodi",
        name: "Test Ingredient",
        slug: "test-ingredient",
        description: "",
        proof: 0,
      }
      UserRepository.getById = jest
        .fn()
        .mockResolvedValueOnce(new Ok(user))
        .mockResolvedValueOnce(
          new Ok({
            ...user,
            shelf: [newIngredient],
          })
        )
      UserRepository.addIngredientToShelf = jest
        .fn()
        .mockResolvedValueOnce(new Ok(user))

      const result = await addIngredientToShelf(
        authenticatedUser,
        newIngredient.id
      )
      expect(result.isOk()).toBeTruthy()
      expect(result.unwrap()).toEqual({
        ...user,
        shelf: [newIngredient],
      })
    })
    it("should return an Err(RecordCouldNotBeUpdatedError) if adding fails", async () => {
      const user: IUser = {
        id: "abcdeaf",
        username: "Phil",
        shelf: [],
        book: [],
        email: "test@test.com",
        roleId: 1,
      }
      const authenticatedUser: AuthenticatedUser = {
        ...user,
        role: {
          id: 1,
          description: "Guest",
          name: "Guest",
          permissions: [],
        },
      }
      const newIngredient: IIngredient = {
        id: "bohahaaodi",
        name: "Test Ingredient",
        slug: "test-ingredient",
        description: "",
        proof: 0,
      }
      UserRepository.getById = jest
        .fn()
        .mockResolvedValueOnce(new Ok(user))
        .mockResolvedValueOnce(
          new Ok({
            ...user,
          })
        )
      UserRepository.addIngredientToShelf = jest
        .fn()
        .mockResolvedValueOnce(
          new Err(new RecordCouldNotBeUpdatedError(user.id))
        )

      const result = await addIngredientToShelf(
        authenticatedUser,
        newIngredient.id
      )
      expect(result.isErr()).toBeTruthy()
      expect(result.unwrapErr()).toBeInstanceOf(RecordCouldNotBeUpdatedError)
    })
  })
})

export {}

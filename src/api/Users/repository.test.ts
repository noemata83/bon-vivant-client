import { RecordNotFoundError } from "../errors"
import { User } from "../models"
import { UserRepository } from "./repository"

describe("UserRepository", () => {
  describe("findById", () => {
    beforeEach(() => {
      jest.resetAllMocks()
    })
    it("should return an Ok(user) if the user is found", async () => {
      User.findByPk = jest.fn().mockResolvedValue({
        id: "294-9-144",
        username: "my_user",
      })
      const result = await UserRepository.getById("294-9-144")
      expect(result.isOk()).toBe(true)
      expect(result.unwrap().username).toEqual("my_user")
    })

    it("should return a RecordNotFoundError if the user is not found", async () => {
      User.findByPk = jest.fn().mockResolvedValue(null)
      const result = await UserRepository.getById("294-9-144")
      expect(result.isErr()).toBe(true)
      expect(result.unwrapErr()).toBeInstanceOf(RecordNotFoundError)
    })
  })
})

export {}

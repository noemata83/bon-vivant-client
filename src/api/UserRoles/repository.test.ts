import { RecordNotFoundError } from "../errors"
import { UserRole } from "../models/userRole.model"
import { UserRoleRepository } from "./repository"

describe("UserRoleRepository", () => {
  describe("findById", () => {
    beforeEach(() => {
      jest.resetAllMocks()
    })
    it("should return an Ok(userRole) if the userRole is found", async () => {
      UserRole.findByPk = jest.fn().mockResolvedValue({
        id: 1,
        name: "Guest",
      })
      const result = await UserRoleRepository.getById(1)
      expect(result.isOk()).toBe(true)
      expect(result.unwrap().name).toEqual("Guest")
    })

    it("should return a RecordNotFoundError if the user role is not found", async () => {
      UserRole.findByPk = jest.fn().mockResolvedValue(null)
      const result = await UserRoleRepository.getById(1)
      expect(result.isErr()).toBe(true)
      expect(result.unwrapErr()).toBeInstanceOf(RecordNotFoundError)
    })
  })
})

export {}

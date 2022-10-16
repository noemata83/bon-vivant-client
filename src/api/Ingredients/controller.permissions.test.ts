import { ForbiddenError } from "apollo-server-core"
import { Ingredient } from "../models"
import { AuthenticatedUser } from "../Users/authorization/authorization"
import { PermissionType } from "../Users/authorization/permission.enum"
import {
  CreateIngredientCommand,
  DeleteIngredientCommand,
  EditIngredientCommand,
} from "./commands"
import {
  createIngredient,
  deleteIngredient,
  editIngredient,
} from "./controller"

const setupCreate: (user: AuthenticatedUser) => CreateIngredientCommand = (
  user
) => {
  const command: CreateIngredientCommand = {
    ingredient: {
      name: "My ingredient",
    },
    user,
  }
  return command
}

const setupEdit: (user: AuthenticatedUser) => EditIngredientCommand = (
  user
) => {
  const command: EditIngredientCommand = {
    id: "1-94-194",
    update: {},
    user,
  }
  return command
}

const setupDelete: (user: AuthenticatedUser) => DeleteIngredientCommand = (
  user
) => {
  const command: DeleteIngredientCommand = {
    id: "-319-391",
    user,
  }
  return command
}
describe("Ingredient Controller - Permission Checks", () => {
  describe("createIngredient", () => {
    beforeEach(() => {
      jest.resetAllMocks()
    })
    it("should prevent a user without permissions from creating an ingredient", async () => {
      const unauthorizeduser: AuthenticatedUser = {
        id: "1223",
        username: "Test",
        role: {
          id: 4,
          description: "",
          name: "Contributor",
          permissions: [
            {
              id: 4,
              action: PermissionType.CreateSpec,
            },
          ],
        },
      }
      const command = setupCreate(unauthorizeduser)
      await expect(createIngredient(command)).rejects.toThrowError(
        ForbiddenError
      )
    })
    it("should not prevent a permitted user from creating an ingredient", async () => {
      const authorizedUser: AuthenticatedUser = {
        id: "1223",
        username: "Test",
        role: {
          id: 4,
          description: "",
          name: "Curator",
          permissions: [
            {
              id: 4,
              action: PermissionType.CreateIngredient,
            },
          ],
        },
      }

      Ingredient.create = jest.fn().mockResolvedValue({ id: 1 })
      Ingredient.findOne = jest.fn().mockResolvedValue({})
      const command = setupCreate(authorizedUser)
      await expect(
        async () => await createIngredient(command)
      ).not.toThrowError(ForbiddenError)
    })
  })
  describe("editIngredient", () => {
    beforeEach(() => {
      jest.resetAllMocks()
    })
    it("should not prevent an authorized user from editing an ingredient", async () => {
      const authorizedUser: AuthenticatedUser = {
        id: "1223",
        username: "Test",
        role: {
          id: 4,
          description: "",
          name: "Curator",
          permissions: [
            {
              id: 4,
              action: PermissionType.EditIngredient,
            },
          ],
        },
      }
      const command = setupEdit(authorizedUser)
      Ingredient.update = jest.fn().mockResolvedValue({})
      Ingredient.findByPk = jest.fn().mockResolvedValue({ toJSON: () => {} })
      await expect(editIngredient(command)).resolves.not.toThrowError(
        ForbiddenError
      )
    })
    it("should prevent an unauthorized user from editing an ingredient", async () => {
      const unauthorizedUser: AuthenticatedUser = {
        id: "1223",
        username: "Test",
        role: {
          id: 4,
          description: "",
          name: "Guest",
          permissions: [
            {
              id: 4,
              action: PermissionType.ListIngredients,
            },
          ],
        },
      }
      const command = setupEdit(unauthorizedUser)
      await expect(editIngredient(command)).rejects.toThrowError(ForbiddenError)
    })
  })
  describe("deleteIngredient", () => {
    beforeEach(() => {
      jest.resetAllMocks()
    })
    it("should not prevent an authorized user from deleting an ingredient", async () => {
      const authorizedUser: AuthenticatedUser = {
        id: "1223",
        username: "Test",
        role: {
          id: 4,
          description: "",
          name: "Curator",
          permissions: [
            {
              id: 4,
              action: PermissionType.DeleteIngredient,
            },
          ],
        },
      }
      const command = setupDelete(authorizedUser)
      Ingredient.destroy = jest.fn().mockResolvedValue({})
      await expect(deleteIngredient(command)).resolves.not.toThrowError(
        ForbiddenError
      )
    })
    it("should prevent an unauthorized user from editing an ingredient", async () => {
      const unauthorizedUser: AuthenticatedUser = {
        id: "1223",
        username: "Test",
        role: {
          id: 4,
          description: "",
          name: "Guest",
          permissions: [
            {
              id: 4,
              action: PermissionType.ListIngredients,
            },
          ],
        },
      }
      const command = setupDelete(unauthorizedUser)
      await expect(deleteIngredient(command)).rejects.toThrowError(
        ForbiddenError
      )
    })
  })
})

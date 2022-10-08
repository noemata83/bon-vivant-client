import { ForbiddenError } from "apollo-server-core"
import { AuthenticatedUser } from "../Users/authorization/authorization"
import { PermissionType } from "../Users/authorization/permission.enum"
import { USER_ROLE } from "../Users/authorization/userRole"
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
      const command = setupCreate(authorizedUser)
      await expect(createIngredient(command)).rejects.not.toThrowError(
        ForbiddenError
      )
    })
  })
  describe("editIngredient", () => {
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
      await expect(editIngredient(command)).rejects.not.toThrowError(
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
      await expect(deleteIngredient(command)).rejects.not.toThrowError(
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

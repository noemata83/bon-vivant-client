import { ForbiddenError } from "apollo-server-core"
import { AuthenticatedUser } from "../Users/authorization/authorization"
import { PermissionType } from "../Users/authorization/permission.enum"
import { USER_ROLE } from "../Users/authorization/userRole"
import { CreateSpecCommand, EditSpecCommand } from "./commands"
import { createSpec, editSpec } from "./controller"

function setupCreate(user: AuthenticatedUser) {
  const command: CreateSpecCommand = {
    spec: {
      name: "My Spec",
    },
    user,
    userRepository: undefined,
    specRepository: undefined,
    specIngredientRepository: undefined,
    ingredientRepository: undefined,
  }
  return command
}

function setupEdit(user: AuthenticatedUser) {
  const command: EditSpecCommand = {
    id: "1111",
    updates: {},
    user,
    userRepository: undefined,
    specRepository: undefined,
    specIngredientRepository: undefined,
    ingredientRepository: undefined,
    reviewRepository: undefined,
  }
  return command
}

describe("Spec Controller", () => {
  describe("createSpec", () => {
    describe("Should prevent", () => {
      it("a guest from creating a cocktail", async () => {
        const user = {
          id: "abc123",
          username: "Tester",
          role: {
            id: USER_ROLE.Guest,
            name: "Guest",
            description: "",
            permissions: [],
          },
        }
        const command = setupCreate(user)
        await expect(() => createSpec(command)).rejects.toThrowError(
          ForbiddenError
        )
      })
    })
    describe("should allow", () => {
      it("a contributor to create a cocktail", async () => {
        const user: AuthenticatedUser = {
          id: "abc123",
          username: "Tester",
          role: {
            id: USER_ROLE.Contributor,
            name: "Contributor",
            description: "",
            permissions: [
              {
                id: 1,
                action: PermissionType.CreateSpec,
              },
            ],
          },
        }
        const command = setupCreate(user)
        await expect(() => createSpec(command)).rejects.not.toThrowError(
          ForbiddenError
        )
      })
    })
  })
  describe("editSpec", () => {
    describe("Should prevent", () => {
      it("a guest from editing a cocktail", async () => {
        const user = {
          id: "abc123",
          username: "Tester",
          role: {
            id: USER_ROLE.Guest,
            name: "Guest",
            description: "",
            permissions: [],
          },
        }
        const command = setupEdit(user)
        await expect(() => editSpec(command)).rejects.toThrowError(
          ForbiddenError
        )
      })
    })
    describe("should allow", () => {
      it("a contributor to edit a cocktail", async () => {
        const user: AuthenticatedUser = {
          id: "abc123",
          username: "Tester",
          role: {
            id: USER_ROLE.Contributor,
            name: "Contributor",
            description: "",
            permissions: [
              {
                id: 1,
                action: PermissionType.EditSpec,
              },
            ],
          },
        }
        const command = setupEdit(user)
        await expect(() => editSpec(command)).rejects.not.toThrowError(
          ForbiddenError
        )
      })
    })
  })
})

export {}

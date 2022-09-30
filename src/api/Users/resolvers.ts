import { User } from "../models"
import { Permission } from "../models/permission.model"
import { UserRole } from "../models/userRole.model"
import { getAllUsers, getUserById } from "./controller"

export default {
  Query: {
    async users(parent, args, context) {
      return context.all.load(User)
    },
    async me(_, args, { user, single }) {
      if (!user) {
        throw new Error("You are not authenticated!")
      }
      return single.load(User, user)
    },
  },
  User: {
    role: (user, _args, context) => {
      return context.single.load(UserRole, user.roleId)
    },
  },
  UserRole: {
    permissions: (userRole, _args, context) => {
      return context.permissions.load(userRole.id)
    },
  },
}

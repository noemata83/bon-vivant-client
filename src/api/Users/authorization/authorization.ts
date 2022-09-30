import { Permission } from "../../models/permission.model"
import { PermissionType } from "./permission.enum"

export interface AuthenticatedUser {
  id: string
  username: string
  role: {
    id: number
    name: string
    description: string
    permissions: Permission[]
  }
}

export const hasPermission = (
  user: AuthenticatedUser,
  permission: PermissionType
) => {
  return user.role.permissions.map((perm) => perm.action).includes(permission)
}

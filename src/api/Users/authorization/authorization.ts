import { Permission } from "../../models/permission.model"
import { PermissionType } from "./permission.enum"

export interface PermissionRecord {
  id: number
  action: PermissionType
}

export interface AuthenticatedUser {
  id: string
  username: string
  role: {
    id: number
    name: string
    description: string
    permissions: PermissionRecord[]
  }
}

export const hasPermission = (
  user: AuthenticatedUser,
  permission: PermissionType
) => {
  return user.role.permissions.map((perm) => perm.action).includes(permission)
}

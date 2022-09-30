import DataLoader from "dataloader"
import { Permission } from "../models/permission.model"
import { UserRole } from "../models/userRole.model"

export class UserRolePermissionLoader {
  loader: DataLoader<unknown, unknown>
  public load(userRoleId) {
    if (!this.loader) {
      this.loader = new DataLoader(async (roleIds: number[]) => {
        const permissionRows = await Permission.findAll({
          include: [
            {
              model: UserRole,
              through: {
                where: {
                  userRoleId: {
                    in: roleIds,
                  },
                },
              },
            },
          ],
        })
        const lookup = roleIds.reduce((acc, roleId) => {
          return {
            ...acc,
            [roleId]: permissionRows.filter((permission) =>
              permission.userRoles.map((role) => role.id).includes(roleId)
            ),
          }
        }, {})

        return roleIds.map((id) => lookup[id])
      })
    }
    return this.loader.load(userRoleId)
  }
}

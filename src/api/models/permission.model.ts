import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"
import Fix from "./decorators/fix.decorator"
import { UserRole } from "./userRole.model"
import { UserRolePermission } from "./userRolePermission.model"

@Fix
@Table({
  timestamps: false,
})
export class Permission extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number

  @Column(DataType.STRING)
  action: string

  @BelongsToMany(() => UserRole, () => UserRolePermission)
  userRoles: UserRole[]
}

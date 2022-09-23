import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"
import Fix from "./decorators/fix.decorator"
import { Permission } from "./permission.model"
import { UserRolePermission } from "./userRolePermission.model"

@Fix
@Table
export class UserRole extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number

  @Column(DataType.STRING)
  name: string

  @Column(DataType.STRING)
  description: string

  @BelongsToMany(() => Permission, () => UserRolePermission)
  permissions: Permission[]
}

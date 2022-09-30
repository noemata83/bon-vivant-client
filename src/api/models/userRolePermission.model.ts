import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"
import Fix from "./decorators/fix.decorator"
import { Permission } from "./permission.model"
import { UserRole } from "./userRole.model"

@Fix
@Table({
  timestamps: false,
})
export class UserRolePermission extends Model {
  @PrimaryKey
  @ForeignKey(() => UserRole)
  @Column(DataType.INTEGER)
  userRoleId: number

  @PrimaryKey
  @ForeignKey(() => Permission)
  @Column(DataType.INTEGER)
  permissionId: number
}

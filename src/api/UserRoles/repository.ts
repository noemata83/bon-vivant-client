import { Err, Ok, Result } from "../../shared/adts/result/result"
import { RecordNotFoundError } from "../errors"
import { UserRole } from "../models/userRole.model"

export class UserRoleRepository {
  static async getById(
    id: number,
    include: any[] = []
  ): Promise<Result<UserRole, RecordNotFoundError>> {
    const userRole = await UserRole.findByPk(id, { include })
    if (!userRole) {
      return new Err(
        new RecordNotFoundError(`UserRole with id ${id} was not found.`)
      )
    } else {
      return new Ok(userRole)
    }
  }
}

import { Repository } from "sequelize-typescript"
import { Result } from "../../shared/adts/result/result"
import { User } from "../models"
import { Permission } from "../models/permission.model"
import { UserRole } from "../models/userRole.model"
import { InvalidUserParameterError } from "./validation/errors"
import { validateUserParams } from "./validation/signUpValidation"

export interface UserSignupParameters {
  username: string
  password: string
  email: string
  contribute: boolean
}

export interface ISignUpCommand {
  username: string
  password: string
  email: string
  contribute: boolean
  res: any
  userRoleRepository: Repository<UserRole>
  userRepository: Repository<User>
  permissionRepository: Repository<Permission>
}

export class SignUpCommand {
  public username: string
  public password: string
  public email: string
  public contribute: boolean
  public res: any
  public userRoleRepository: Repository<UserRole>
  public userRepository: Repository<User>
  public permissionRepository: Repository<Permission>

  private constructor(
    params: UserSignupParameters,
    res: any,
    userRoleRepository: Repository<UserRole>,
    userRepository: Repository<User>,
    permissionRepository: Repository<Permission>
  ) {
    this.username = params.username
    this.password = params.password
    this.email = params.email
    this.contribute = params.contribute
    this.res = res
    this.userRoleRepository = userRoleRepository
    this.userRepository = userRepository
    this.permissionRepository = permissionRepository
  }

  static make: (
    params: UserSignupParameters,
    res: any,
    userRoleRepo: Repository<UserRole>,
    userRepo: Repository<User>,
    permissionRepo: Repository<Permission>
  ) => Result<SignUpCommand, InvalidUserParameterError> = (
    params,
    res,
    userRoleRepo,
    userRepo,
    permissionRepo
  ) => {
    return validateUserParams(params).map(
      (validParams: UserSignupParameters) =>
        new SignUpCommand(
          validParams,
          res,
          userRoleRepo,
          userRepo,
          permissionRepo
        )
    )
  }
}

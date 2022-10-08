import { NextApiResponse } from "next"
import { Result } from "../../shared/adts/result/result"
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
}

export class SignUpCommand {
  public username: string
  public password: string
  public email: string
  public contribute: boolean
  public res: any

  private constructor(params: UserSignupParameters, res: NextApiResponse) {
    this.username = params.username
    this.password = params.password
    this.email = params.email
    this.contribute = params.contribute
    this.res = res
  }

  static make: (
    params: UserSignupParameters,
    res: any
  ) => Result<SignUpCommand, InvalidUserParameterError> = (params, res) => {
    return validateUserParams(params).map(
      (validParams: UserSignupParameters) => new SignUpCommand(validParams, res)
    )
  }
}

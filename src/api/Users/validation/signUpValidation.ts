import { Err, Ok, Result } from "../../../shared/adts/result/result"
import { ResultTransformFn } from "../../../shared/adts/result/result.interface"
import { UserSignupParameters } from "../commands"
import {
  InvalidEmailError,
  InvalidPasswordError,
  InvalidUserParameterError,
} from "./errors"

export const validateUserParams: (
  params: UserSignupParameters
) => Result<UserSignupParameters, InvalidUserParameterError> = (params) => {
  return validatePassword(params).andThen(validateEmail)
}

const validatePassword: (
  params: UserSignupParameters
) => Result<UserSignupParameters, InvalidPasswordError> = (params) => {
  if (params.password.length > 7) {
    return new Ok(params)
  } else {
    return new Err(
      new InvalidPasswordError("Passwords must be 8 characters in length")
    )
  }
}

const validateEmail: <T, E extends Error = Error>(
  params: UserSignupParameters
) => Result<UserSignupParameters, InvalidEmailError> = (params) => {
  if (
    params.email?.match(
      new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    )
  ) {
    return new Ok(params)
  } else {
    return new Err(new InvalidEmailError("Invalid e-mail"))
  }
}

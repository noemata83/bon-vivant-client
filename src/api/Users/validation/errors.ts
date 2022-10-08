export class InvalidPasswordError extends Error {
  public type = "InvalidPasswordError"
  constructor(msg: string) {
    super(msg)
    Object.setPrototypeOf(this, InvalidPasswordError.prototype)
  }
}

export class InvalidEmailError extends Error {
  public type = "InvalidEmailError"
  constructor(msg: string) {
    super(msg)
    Object.setPrototypeOf(this, InvalidEmailError.prototype)
  }
}

export type InvalidUserParameterError = InvalidPasswordError | InvalidEmailError

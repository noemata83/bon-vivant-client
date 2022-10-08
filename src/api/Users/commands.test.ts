import { SignUpCommand, UserSignupParameters } from "./commands"
import { InvalidEmailError, InvalidPasswordError } from "./validation/errors"

describe("makeSignupCommand", () => {
  it("should return Ok with a valid e-mail and password", () => {
    const params: UserSignupParameters = {
      username: "my_username",
      password: "asdf1234",
      email: "tester@test.com",
      contribute: false,
    }
    const result = SignUpCommand.make(params, undefined)
    expect(result.isOk()).toBe(true)
  })

  it("should return an invalid password error if the password is too short", () => {
    const params: UserSignupParameters = {
      username: "my_username",
      password: "asdf123",
      email: "tester@test.com",
      contribute: false,
    }
    const result = SignUpCommand.make(params, undefined)
    expect(result.isErr()).toBe(true)
    expect(result.unwrapErr()).toBeInstanceOf(InvalidPasswordError)
  })

  it("should return an invalid e-mail error if the e-mail is an invalid format", () => {
    const params: UserSignupParameters = {
      username: "my_username",
      password: "asdf1234",
      email: "teste@com",
      contribute: false,
    }
    const result = SignUpCommand.make(params, undefined)
    expect(result.isErr()).toBe(true)
    expect(result.unwrapErr()).toBeInstanceOf(InvalidEmailError)
  })
})

export {}

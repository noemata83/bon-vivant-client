import {
  IOption,
  OptionFilterFn,
  OptionMapFn,
  OptionMatcher,
} from "./option.interface"

export type Option<T> = Some<T> | None<T>

export const parseOption = <T>(val: T): Option<T> => {
  if (val === undefined || val === null) {
    return new None<T>()
  }
  return new Some<T>(val)
}

export class OptionConstructorError extends Error {
  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, OptionConstructorError.prototype)
  }

  getErrorMessage() {
    return "Cannot construct Option instance: " + this.message
  }
}

export class Some<T> implements IOption<T> {
  private _value: T

  constructor(value: T) {
    if (value === undefined || value === null) {
      throw new OptionConstructorError(
        "Some constructor called with an undefined or null value"
      )
    }
    this._value = value
  }

  map<U>(f: OptionMapFn<T, U>): Option<U> {
    return new Some(f(this._value))
  }

  mapOr<U>(f: OptionMapFn<T, U>): Option<U> {
    return this.map<U>(f)
  }

  filter(f: OptionFilterFn<T>): Option<T> {
    if (f(this._value)) {
      return new Some<T>(this._value)
    } else {
      return new None()
    }
  }

  unwrap() {
    return this._value
  }

  unwrapOr(_: any) {
    return this.unwrap()
  }

  unwrapOrElse(_: any) {
    return this.unwrap()
  }

  match({ some }: OptionMatcher<T>) {
    return some(this._value)
  }
}

export class None<T> implements IOption<T> {
  constructor() {}

  map<T, U>(f: OptionMapFn<T, U>): Option<U> {
    return new None<U>()
  }

  mapOr<T, U>(_: OptionMapFn<T, U>, elseVal: U): Option<U> {
    return new Some(elseVal)
  }

  filter<T>(f: OptionFilterFn<T>): Option<T> {
    return new None()
  }

  unwrap(): T {
    throw new Error("Panic! Option does not contain a value.")
  }

  unwrapOr<T>(elseVal: T) {
    return elseVal
  }

  unwrapOrElse(f: Function) {
    return f()
  }

  match({ none }: OptionMatcher<T>) {
    return none()
  }
}

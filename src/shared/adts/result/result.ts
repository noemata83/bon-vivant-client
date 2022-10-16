import { Some, None, Option } from "../option/option"
import {
  ErrMapFn,
  IResult,
  ResultFn,
  ResultMapFn,
  ResultMatcher,
  ResultTransformFn,
} from "./result.interface"

export type Result<T, E extends Error> = Ok<T, E> | Err<T, E>

export const getResult = <T, E extends Error = Error>(
  fn: ResultFn<T, E>,
  ...args: unknown[]
): Result<T, E> => {
  try {
    return new Ok<T, E>(fn(...args))
  } catch (e) {
    return new Err<T, E>(e)
  }
}

export class Ok<T, E extends Error> implements IResult<T, E> {
  private _value: T

  constructor(value: T) {
    this._value = value
  }

  isOk(): boolean {
    return true
  }

  isErr(): boolean {
    return false
  }

  map<U = unknown>(f: ResultMapFn<T, U>): Result<U, E> {
    return new Ok<U, E>(f(this._value))
  }

  mapErr<F extends Error = Error>(f: ErrMapFn<T, E, F>): Result<T, F> {
    return new Ok<T, F>(this._value)
  }

  expect(): T {
    return this._value
  }

  unwrap(): T {
    return this._value
  }

  unwrapErr(): E {
    throw new Error(`${this._value}`)
  }

  ok(): Option<T> {
    return new Some<T>(this._value)
  }

  err(): Option<E> {
    return new None<E>()
  }

  match({ ok }: ResultMatcher<T, E>) {
    return ok(this._value)
  }

  andThen<U = T, F extends Error = E>(
    fn: ResultTransformFn<T, E, U, F>
  ): Result<U, F> {
    return fn(this._value)
  }

  orElse<U, F extends Error>(_fn: ResultTransformFn<U, F>): Result<T, E> {
    return new Ok(this._value)
  }
}

export class Err<T, E extends Error> implements IResult<T, E> {
  private _error: E

  constructor(error: any) {
    this._error = error
  }

  isOk() {
    return false
  }

  isErr() {
    return true
  }

  expect(message: string): T {
    throw new Error(message)
  }

  unwrap(): T {
    throw this._error
  }

  unwrapErr(): E {
    return this._error
  }

  map<U = unknown>(_: any): Result<U, E> {
    return new Err<U, E>(this._error)
  }

  mapErr<F extends Error = Error>(f: ErrMapFn<T, E, F>): Result<T, F> {
    return new Err<T, F>(f(this._error))
  }

  ok() {
    return new None<T>()
  }

  err() {
    return new Some<E>(this._error)
  }

  match({ err }: ResultMatcher<T, E>) {
    return err(this._error)
  }

  andThen<U = T, F extends Error = E>(_fn: ResultTransformFn<T, E, U, F>) {
    return new Err<T, E>(this._error)
  }

  orElse<U, F extends Error>(fn: ResultTransformFn<T, E, U, F>) {
    return fn(this._error)
  }
}

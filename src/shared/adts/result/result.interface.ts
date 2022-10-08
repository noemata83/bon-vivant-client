import { Err, Ok } from "./result"
import { Option } from "../option/option"

type Result<T, E extends Error> = Ok<T, E> | Err<T, E>

type ResultFnInput<T, E extends Error = Error, F extends Error = E> =
  | any
  | any[]
  | E
  | F

export type ResultFn<T, E extends Error = Error> = (
  ...args: ResultFnInput<T, E>[]
) => T

export type ResultTransformFn<
  T,
  E extends Error = Error,
  U = T,
  F extends Error = E
> = (args: ResultFnInput<T, E>) => Result<U, F>

export interface IResult<T, E extends Error> {
  unwrap: ResultUnwrap<T>
  unwrapErr: ResultUnwrapErr<E>
  map: ResultMap<T, E>
  mapErr: ResultMapErr<T>
  isOk: () => boolean
  isErr: () => boolean
  ok: () => Option<T>
  err: () => Option<E>
  expect: (e: string) => T
  match: ResultMatch<T, E>
  andThen: ResultTransform<T, E>
  orElse: ConditionalResultTransform
}

export interface ResultUnwrap<T> {
  (): T
}

export interface ResultUnwrapErr<E> {
  (): E
}

export interface ResultMap<T, E extends Error, U = unknown> {
  (f: ResultMapFn<T, U>): Result<U, E>
}

export interface ResultMapErr<
  T,
  E extends Error = Error,
  F extends Error = Error
> {
  (f: ErrMapFn<T, E, F>): Result<T, F>
}

type ConditionalResultOutput<
  T = unknown,
  E extends Error = Error,
  U = unknown,
  F extends Error = Error
> = Result<T, E> | Result<U, F>

export interface ConditionalResultTransform<
  T = unknown,
  E extends Error = Error,
  U = unknown,
  F extends Error = Error
> {
  (f: ResultTransformFn<U, F>): ConditionalResultOutput<T, E, U, F>
}

export interface ResultTransform<
  T = unknown,
  E extends Error = Error,
  U = T,
  F extends Error = E
> {
  (f: ResultTransformFn<T, E, U, F>): Result<U, F>
}

export interface ResultMapFn<T, U = unknown> {
  (input: T): U
}

export interface ErrMapFn<T, E extends Error = Error, F extends Error = Error> {
  (error: E): Result<T, F>
}

export interface ResultMatch<T, E extends Error> {
  (matcher: ResultMatcher<T, E>): any
}

export interface ResultMatcher<T, E extends Error> {
  ok: ResultMatchOkFn<T>
  err: ResultMatchErrFn<E>
}

export interface ResultMatchOkFn<T> {
  (t: T): any
}

export interface ResultMatchErrFn<E extends Error> {
  (e: E): any
}

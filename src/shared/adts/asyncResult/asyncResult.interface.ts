import { Option } from "../option/option"
import { Result } from "../result/result"
import {
  ErrMapFn,
  ResultFnInput,
  ResultMapFn,
  ResultTransformFn,
} from "../result/result.interface"
import { AsyncResult } from "./asyncResult"

export interface IResultAsync<T, E extends Error> {
  map: AsyncResultMap<T, E>
  mapErr: AsyncResultMapErr<T, E>
  expect: (e: string) => Promise<T>
  match: AsyncResultMatch<T, E>
  andThen: AsyncResultTransform<T, E>
  orElse: AsyncConditionalResultTransform
}

export interface AsyncResultUnwrap<T, E extends Error = Error> {
  (): Promise<T | E>
}

export interface AsyncResultUnwrapErr<T, E extends Error> {
  (): Promise<E>
}

export interface AsyncResultMap<T, E extends Error, U = unknown> {
  (f: ResultMapFn<T, U>): AsyncResult<U, E>
}

export interface AsyncResultMapErr<
  T,
  E extends Error = Error,
  F extends Error = Error
> {
  (f: ErrMapFn<T, E, F>): AsyncResult<T, F>
}

type AsyncConditionalResultOutput<
  T = unknown,
  E extends Error = Error,
  U = unknown,
  F extends Error = Error
> = AsyncResult<T, E> | AsyncResult<U, F>

export interface AsyncConditionalResultTransform<
  T = unknown,
  E extends Error = Error,
  U = unknown,
  F extends Error = Error
> {
  (f: ResultTransformFn<U, F>): AsyncConditionalResultOutput<T, E, U, F>
}
export interface ConditionalResultTransformAsync<
  T = unknown,
  E extends Error = Error,
  U = unknown,
  F extends Error = Error
> {
  (f: ResultTransformFn<U, F>): AsyncConditionalResultOutput<T, E, U, F>
}

export type ResultTransformAsyncFn<
  T,
  E extends Error = Error,
  U = T,
  F extends Error = E
> = (args: ResultFnInput<T, E>) => Promise<Result<U, F>>

export interface AsyncResultTransform<
  T = unknown,
  E extends Error = Error,
  U = T,
  F extends Error = E
> {
  (f: ResultTransformFn<T, E, U, F>): AsyncResult<U, F>
}
export interface ResultAsyncPipeOperator {
  (x: any): Promise<Result<any, any>>
}

export interface ResultAsyncPipe {
  (...args: ResultAsyncPipeOperator[]): Promise<Result<any, any>>
}

export interface AsyncResultMapFn<T, U = unknown> {
  (input: T): Promise<U>
}

export interface AsyncErrMapFn<
  T,
  E extends Error = Error,
  F extends Error = Error
> {
  (error: E): Promise<Result<T, F>>
}

export interface AsyncResultMatch<T, E extends Error> {
  (matcher: AsyncResultMatcher<T, E>): Promise<any>
}

export interface AsyncResultMatcher<T, E extends Error> {
  ok: AsyncResultMatchOkFn<T>
  err: AsyncResultMatchErrFn<E>
}

export interface AsyncResultMatchOkFn<T> {
  (t: T): Promise<any>
}

export interface AsyncResultMatchErrFn<E extends Error> {
  (e: E): Promise<any>
}

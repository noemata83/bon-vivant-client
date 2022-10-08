import { None, Some } from "./option"

type Option<T> = Some<T> | None<T>

export interface IOption<T> {
  map: OptionMap<T>
  filter: OptionFilter<T>
  mapOr: OptionMapOr<T>
  unwrap: () => T
  unwrapOr: OptionUnwrapOr<T>
  unwrapOrElse: OptionUnwrapOrElse<T>
  match: MatchFn<T>
}

export interface OptionMap<T, U = unknown> {
  (func: OptionMapFn<T, U>): Option<U>
}

export interface OptionMapOr<T, U = unknown> {
  (func: OptionMapFn<T, U>, elseVal: U): Option<U>
}

export interface OptionUnwrapOr<T, U = unknown> {
  (elseVal: U): T | U
}

export interface OptionUnwrapOrElse<T, U = unknown> {
  (elseFn: Function): T | U
}

export interface OptionMapFn<T, U = unknown> {
  (arg: T): U
}

export interface OptionFilter<T> {
  (func: OptionFilterFn<T>): Option<T>
}

export interface OptionFilterFn<T> {
  (arg: T): boolean
}

export interface OptionMapOr<T, U = unknown> {
  (func: OptionMapFn<T, U>, elseVal: U): Option<U>
}

export interface MatchFn<T> {
  (matcher: OptionMatcher<T>): any
}

export interface OptionMatcher<T> {
  some: SomeMatchFn<T>
  none: Function
}

export interface SomeMatchFn<T, U = unknown> {
  (val: T): U
}

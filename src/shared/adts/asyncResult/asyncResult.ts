import { Err, Ok, Result } from "../result/result"
import {
  ErrMapFn,
  ResultMapErr,
  ResultMapFn,
  ResultTransformFn,
} from "../result/result.interface"
import {
  IResultAsync,
  ResultAsyncPipeOperator,
  ResultTransformAsyncFn,
} from "./asyncResult.interface"

export class AsyncResult<T, E extends Error> implements IResultAsync<T, E> {
  private _promise: Promise<Result<T, E>>

  constructor(promise: Promise<Result<T, E>>) {
    this._promise = promise
  }

  public async resolve() {
    return await this._promise
  }

  public async unwrapOr() {}

  public map<U = unknown>(fn: ResultMapFn<T, U>) {
    return new AsyncResult<U, E>(this._promise.then((res) => res.map(fn)))
  }

  public mapErr<F extends Error = Error>(fn: ErrMapFn<T, E, F>) {
    return new AsyncResult<T, F>(this._promise.then((res) => res.mapErr(fn)))
  }

  public async expect(message: string) {
    return (await this._promise).expect(message)
  }

  public async match({ ok, err }) {
    let result = await this._promise
    return result.isOk() ? ok(result) : err(result)
  }

  public andThen<U = T, F extends Error = E>(
    fn: ResultTransformFn<T, E, U, F>
  ) {
    return new AsyncResult<U, F>(
      this._promise.then((result) =>
        result.isOk() ? fn(result) : new Err<U, F>(result)
      )
    )
  }

  public orElse<U = T, F extends Error = E>(fn: ResultTransformFn<T, E, U, F>) {
    return new AsyncResult<any, any>(
      this._promise.then((result) =>
        result.isErr() ? fn(result) : new Ok<T, E>(result.unwrap())
      )
    )
  }

  public pipe(...fns: ResultAsyncPipeOperator[]): AsyncResult<any, any> {
    return new AsyncResult(
      fns.reduce(async (acc, fn) => {
        let result = await acc
        return result.isOk() ? fn(result) : result
      }, this._promise)
    )
  }
}

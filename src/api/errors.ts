export class RecordNotFoundError extends Error {
  public type = "RecordNotFoundError"
  constructor(msg: string) {
    super(msg)
    Object.setPrototypeOf(this, RecordNotFoundError.prototype)
  }
}

export class RecordCouldNotBeUpdatedError extends Error {
  public type = "RecordCouldNotBeUpdatedError"
  constructor(msg: string) {
    super(msg)
    Object.setPrototypeOf(this, RecordCouldNotBeUpdatedError.prototype)
  }
}

export class RecordAlreadyExistsInCollectionError extends Error {
  public type = "RecordAlreadyExistsInCollectionError"
  constructor(msg: string) {
    super(msg)
    Object.setPrototypeOf(this, RecordAlreadyExistsInCollectionError.prototype)
  }
}

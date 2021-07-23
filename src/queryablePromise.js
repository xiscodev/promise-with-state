import { FULFILLED, PENDING, REJECTED } from 'state'

class QueryablePromise extends Promise {
  constructor (thenable) {
    super((fulfill, reject) => thenable(
      resolution => {
        fulfill(resolution)
        this._state = FULFILLED
      },
      rejection => {
        reject(rejection)
        this._state = REJECTED
      }
    ))
    this._state = PENDING
  }

  get state () {
    return this._state
  }

  isPending () {
    return this._state === PENDING
  }

  isFulfilled () {
    return this._state === FULFILLED
  }

  isRejected () {
    return this._state === REJECTED
  }
}

export default QueryablePromise

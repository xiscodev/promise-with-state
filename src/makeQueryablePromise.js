import { FULFILLED, PENDING, REJECTED } from 'state'
import { isPromise } from 'the-type-validator'

const makeQueryablePromise = (promise) => {
  if (!isPromise(promise)) {
    throw new Error('argument is not a Promise')
  }

  if (promise.state === FULFILLED || promise.state === PENDING || promise.state === REJECTED) {
    return promise
  }

  promise.state = PENDING

  promise
    .then(resolution => {
      promise.state = FULFILLED
      return resolution
    })
    .catch(rejection => {
      promise.state = REJECTED
      return rejection
    })

  promise.isPending = function() {
    return promise.state === PENDING
  }

  promise.isFulfilled = function() {
    return promise.state === FULFILLED
  }

  promise.isRejected = function() {
    return promise.state === REJECTED
  }

  return promise
}

export default makeQueryablePromise

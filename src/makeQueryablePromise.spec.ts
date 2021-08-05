import makeQueryablePromise from 'makeQueryablePromise'
import QueryablePromiseState from 'queryablePromiseState'

// ENVIRONMENT VARIABLES
jest.useFakeTimers()

const testTime = 1000
const promiseTime = 1000

let promiseResolve = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('hasResolved')
  }, promiseTime)
})

let promiseReject = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('hasRejected')
  }, promiseTime)
})

const _resetEnv = () => {
  jest.clearAllTimers()

  promiseResolve = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hasResolved')
    }, promiseTime)
  })

  promiseReject = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('hasRejected')
    }, promiseTime)
  })
}

//  TESTS
describe('makeQueryablePromise', () => {
  it('should exist', () => {
    expect(makeQueryablePromise).not.toBeUndefined()
  })

  it('should be a function', () => {
    expect(typeof makeQueryablePromise).toBe('function')
  })

  it('should has state property after makeQueryablePromise', () => {
    const queryablePromise = makeQueryablePromise(promiseResolve)
    expect(queryablePromise.state).toBeDefined()
  })

  it('should has isPending function after makeQueryablePromise', () => {
    const queryablePromise = makeQueryablePromise(promiseResolve)
    expect(typeof queryablePromise.isPending).toBe('function')
  })

  it('should has isFulfilled function after makeQueryablePromise', () => {
    const queryablePromise = makeQueryablePromise(promiseResolve)
    expect(typeof queryablePromise.isFulfilled).toBe('function')
  })

  it('should has isRejected function after makeQueryablePromise', () => {
    const queryablePromise = makeQueryablePromise(promiseResolve)
    expect(typeof queryablePromise.isRejected).toBe('function')
  })

  it('should thenable on pending state be PENDING', () => {
    const queryablePromise = makeQueryablePromise(promiseResolve)

    expect(queryablePromise.state).toBe(QueryablePromiseState.PENDING)
  })

  it('should thenable on fulfill state be FULFILLED', (done) => {
    _resetEnv()
    const queryablePromise = makeQueryablePromise(promiseResolve)

    queryablePromise
      .then(() => {
        expect(queryablePromise.state).toBe(QueryablePromiseState.FULFILLED)
        done()
      })
      .catch()

    jest.advanceTimersByTime(testTime)
  })

  it('should thenable on reject state be REJECTED', (done) => {
    _resetEnv()
    const queryablePromise = makeQueryablePromise(promiseReject)

    queryablePromise
      .then()
      .catch(() => {
        expect(queryablePromise.state).toBe(QueryablePromiseState.REJECTED)
        done()
      })

    jest.advanceTimersByTime(testTime)
  })

  it('should exist isPending method and return true on PENDING', () => {
    _resetEnv()
    const queryablePromise = makeQueryablePromise(promiseResolve)

    expect(queryablePromise.isPending()).toBeTruthy()
  })

  it('should exist isFulfilled method and return true on FULFILLED', (done) => {
    _resetEnv()
    const queryablePromise = makeQueryablePromise(promiseResolve)

    queryablePromise
      .then(() => {
        expect(queryablePromise.isFulfilled()).toBeTruthy()
        done()
      })
      .catch()

    jest.advanceTimersByTime(testTime)
  })

  it('should exist isRejected method and return true on REJECTED', (done) => {
    _resetEnv()
    const queryablePromise = makeQueryablePromise(promiseReject)

    queryablePromise
      .then()
      .catch(() => {
        expect(queryablePromise.isRejected()).toBeTruthy()
        done()
      })

    jest.advanceTimersByTime(testTime)
  })
})

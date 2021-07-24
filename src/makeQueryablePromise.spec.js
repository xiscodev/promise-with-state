import makeQueryablePromise from 'makeQueryablePromise'
import { FULFILLED, PENDING, REJECTED } from 'state'

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  console.log('Unhandled Rejection from:', promise)
})

// ENVIRONMENT VARIABLES
jest.useFakeTimers()

const waitTime = 2000
const fakePromise = {}

let promiseResolve = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 1000)
})

let promiseReject = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject()
  }, 1000)
})

const _resetEnv = () => {
  jest.clearAllTimers()

  promiseResolve = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })

  promiseReject = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject()
    }, 1000)
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

  it('should be called with an argument', () => {
    expect(makeQueryablePromise).toThrowError(Error)
    expect(makeQueryablePromise).toThrowError('argument is not a Promise')
  })

  it('should receive thenable', () => {
    expect(() => { makeQueryablePromise(fakePromise) }).toThrowError(Error)
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
    _resetEnv()
    const queryablePromise = makeQueryablePromise(promiseResolve)

    expect(queryablePromise.state).toBe(PENDING)
  })

  it('should thenable on fulfill state be FULFILLED', () => {
    _resetEnv()
    const queryablePromise = makeQueryablePromise(promiseResolve)

    queryablePromise
      .then(() => {
        expect(queryablePromise.state).toBe(FULFILLED)
      })
      .catch()
    
    jest.advanceTimersByTime(waitTime)
  })

  it('should thenable on reject state be REJECTED', () => {
    _resetEnv()
    const queryablePromise = makeQueryablePromise(promiseReject)

    queryablePromise
    .then()
    .catch(() => {
      expect(queryablePromise.state).toBe(REJECTED)
    })

    jest.advanceTimersByTime(waitTime)
  })

  it('should exist isPending method and return true on PENDING', () => {
    _resetEnv()
    const queryablePromise = makeQueryablePromise(promiseResolve)

    expect(queryablePromise.isPending()).toBeTruthy()
  })

  it('should exist isFulfilled method and return true on FULFILLED', () => {
    _resetEnv()
    const queryablePromise = makeQueryablePromise(promiseResolve)

    queryablePromise
      .then(() => {
        expect(queryablePromise.isFulfilled()).toBeTruthy()
      })
      .catch()
    
    jest.advanceTimersByTime(waitTime)
  })

  it('should exist isRejected method and return true on REJECTED', () => {
    _resetEnv()
    const queryablePromise = makeQueryablePromise(promiseReject)

    queryablePromise
    .then()
    .catch(() => {
      expect(queryablePromise.isRejected()).toBeTruthy()
    })

    jest.advanceTimersByTime(waitTime)
  })
})

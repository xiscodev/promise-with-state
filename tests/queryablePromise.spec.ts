import { describe, test, jest, expect } from '@jest/globals'
import PromiseExecutor from '../src/promiseExecutor'
import PromiseState from '../src/promiseState'
import QueryablePromise from '../src/queryablePromise'

// ENVIRONMENT CONDITIONS
jest.useFakeTimers()

// ENVIRONMENT VARIABLES
const testTime = 100
const res = 'QueryablePromise hasResolved'
const rej = 'QueryablePromise hasRejected'
const numRes = 200
const numRej = 500

const promiseResolve = () => {
  return new QueryablePromise<string>((resolve) => {
    setTimeout(() => resolve(res), testTime)
  })
}

const promiseReject = () => {
  return new QueryablePromise<string>((_, reject) => {
    setTimeout(() => reject(rej), testTime)
  })
}

//  UNIT TESTS
describe('unit tests', () => {
  test('should exist', () => {
    expect(QueryablePromise).not.toBeUndefined()
  })

  test('should be instantiable with function', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fnExecutor: PromiseExecutor<string> = (_resolve, _reject) => {}
    const queryablePromise = new QueryablePromise(fnExecutor)
    expect(typeof queryablePromise).toBe('object')
  })

  test('should has state property and \'isState\' functions', () => {
    const queryablePromise = promiseResolve()
    expect(queryablePromise).toHaveProperty('state')
    expect(typeof queryablePromise.isPending).toBe('function')
    expect(typeof queryablePromise.isFulfilled).toBe('function')
    expect(typeof queryablePromise.isRejected).toBe('function')
  })

  test('should thenable on pending state be PENDING', () => {
    const queryablePromise = promiseResolve()
    expect(queryablePromise.state).toBe(PromiseState.PENDING)
  })

  test('should throw error if fnExecutor is not Promise instance or function', () => {
    const fnExecutor = 42
    const error = new Error('The constructor must receive a Promise instance or a Promise executor function')
    try {
      // @ts-expect-error: The constructor must receive a Promise instance or a Promise executor function
      // eslint-disable-next-line no-new
      new QueryablePromise(fnExecutor)
    } catch (err) {
      expect(err?.message).toBe(error.message)
    }
  })
})

//  IMPLEMENTATION TESTS
describe('implementation tests', () => {
  test('should exist isPending method and return true on PENDING and false on FULFILLED', () => {
    const queryablePromise = promiseResolve()
    expect(queryablePromise.isPending()).toBeTruthy()

    queryablePromise
      .then(() => {
        expect(queryablePromise.isPending()).toBeFalsy()
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).resolves.toMatch(res)
  })

  test('should thenable on fulfill state be FULFILLED', () => {
    const queryablePromise = promiseResolve()
      .then(() => {
        expect(queryablePromise.state).toBe(PromiseState.FULFILLED)
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).resolves.toMatch(res)
  })

  test('should exist isFulfilled method and return true on FULFILLED', () => {
    const queryablePromise = promiseResolve()
      .then(() => {
        expect(queryablePromise.isFulfilled()).toBeTruthy()
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).resolves.toMatch(res)
  })

  // TODO: check callback resolve to be passed from outside
  test('should thenable on fulfill state have run mockFn function once', () => {
    const mockFn = jest.fn()

    const promiseExecutor :PromiseExecutor<number> = (resolve) => {
      setTimeout(() => {
        // TODO: mockFn should be the resolve callback
        mockFn()
        resolve(numRes)
      }, testTime)
    }

    const queryablePromise = new QueryablePromise(promiseExecutor)
      .then(() => {
        expect(queryablePromise.state).toBe(PromiseState.FULFILLED)
      })

    expect(mockFn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(testTime)

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(queryablePromise).resolves.toBe(numRes)
  })

  test('should thenable on rejected state be REJECTED', () => {
    const queryablePromise = promiseReject()
      .catch(() => {
        expect(queryablePromise.state).toBe(PromiseState.REJECTED)
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).rejects.toMatch(rej)
  })

  test('should exist isRejected method and return true on REJECTED', () => {
    const queryablePromise = promiseReject()
      .catch(() => {
        expect(queryablePromise.isRejected()).toBeTruthy()
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).rejects.toMatch(rej)
  })

  // TODO: check callback reject to be passed from outside
  test('should thenable on rejected state have run mockFn function once', () => {
    const mockFn = jest.fn()

    const promiseExecutor :PromiseExecutor<number> = (_, reject) => {
      setTimeout(() => {
        // TODO: mockFn should be the reject callback
        mockFn()
        reject(numRej)
      }, testTime)
    }

    const queryablePromise = new QueryablePromise(promiseExecutor)
      .catch(() => {
        expect(queryablePromise.state).toBe(PromiseState.REJECTED)
      })

    expect(mockFn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(testTime)

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(queryablePromise).rejects.toBe(numRej)
  })

  // TODO: test finally method for cases
  test('should not affect the resolved value when using finally', () => {
    const queryablePromise = promiseResolve()

    queryablePromise
      .finally(() => {
        expect(queryablePromise.isFulfilled()).toBeTruthy()
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).resolves.toMatch(res)
  })

  // test('should not affect the rejected value when using finally', () => {
  //   const queryablePromise = promiseReject()

  //   queryablePromise
  //     .finally(() => {
  //       expect(queryablePromise.isRejected()).toBeTruthy()
  //       // expect(queryablePromise.isRejected()).toBeFalsy()
  //     })

  //   jest.advanceTimersByTime(testTime)
  //   expect(queryablePromise).rejects.toMatch(rej)
  // })

  test('should Promise allSettled work for QueryablePromise state FULFILLED', () => {
    const queryablePromises = [promiseResolve(), promiseResolve()]

    Promise.allSettled(queryablePromises).then((results) => {
      results.forEach((result) => {
        expect(result?.status).toBe(PromiseState.FULFILLED.toLowerCase())
      })
    })

    jest.advanceTimersByTime(testTime)
  })

  test('should Promise allSettled work for QueryablePromise state REJECTED', () => {
    const queryablePromises = [promiseReject(), promiseReject()]

    Promise.allSettled(queryablePromises).then((results) => {
      results.forEach((result) => {
        expect(result?.status).toBe(PromiseState.REJECTED.toLowerCase())
      })
    })

    jest.advanceTimersByTime(testTime)
  })
})

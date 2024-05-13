import { describe, test, jest, expect } from '@jest/globals'
import PromiseState from '../src/promiseState'
import makeQueryablePromise from '../src/makeQueryablePromise'

// ENVIRONMENT CONDITIONS
jest.useFakeTimers()

// ENVIRONMENT VARIABLES
const testTime = 100
const res = 'makeQueryablePromise hasResolved'
const rej = 'makeQueryablePromise hasRejected'
const numRes = 200
const numRej = 500

const promiseResolve = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(res), testTime)
  })
}

const promiseReject = (): Promise<string> => {
  // eslint-disable-next-line promise/param-names
  return new Promise((_, reject) => {
    setTimeout(() => reject(rej), testTime)
  })
}

//  UNIT TESTS
describe('unit tests', () => {
  test('should exist and be a function', () => {
    expect(makeQueryablePromise).not.toBeUndefined()
    expect(typeof makeQueryablePromise).toBe('function')
  })

  test('should has state property and \'isState\' functions after makeQueryablePromise', () => {
    const queryablePromise = makeQueryablePromise(promiseResolve())
    expect(queryablePromise).toHaveProperty('state')
    expect(typeof queryablePromise.isPending).toBe('function')
    expect(typeof queryablePromise.isFulfilled).toBe('function')
    expect(typeof queryablePromise.isRejected).toBe('function')
  })

  test('should thenable on pending currentState be PENDING', () => {
    const queryablePromise = makeQueryablePromise(promiseResolve())
    expect(queryablePromise.state).toBe(PromiseState.PENDING)
  })

  test('should throw error if fnExecutor is not Promise instance or function', () => {
    const fnExecutor = 42
    const error = new Error('The constructor must receive a Promise instance or a Promise executor function')
    try {
      // @ts-expect-error: The constructor must receive a Promise instance or a Promise executor function
      makeQueryablePromise(fnExecutor)
    } catch (err) {
      expect(err?.message).toBe(error.message)
    }
  })
})

//  IMPLEMENTATION TESTS
describe('implementation tests', () => {
  test('should exist isPending method and return true on PENDING and false on FULFILLED', () => {
    const queryablePromise = makeQueryablePromise(promiseResolve())
    expect(queryablePromise.isPending()).toBeTruthy()

    queryablePromise
      .then(() => {
        expect(queryablePromise.isPending()).toBeFalsy()
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).resolves.toMatch(res)
  })

  test('should thenable on fulfill state be FULFILLED', () => {
    const queryablePromise = makeQueryablePromise(promiseResolve())
      .then(() => {
        expect(queryablePromise.state).toBe(PromiseState.FULFILLED)
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).resolves.toMatch(res)
  })

  test('should exist isFulfilled method and return true on FULFILLED', () => {
    const queryablePromise = makeQueryablePromise(promiseResolve())
      .then(() => {
        expect(queryablePromise.isFulfilled()).toBeTruthy()
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).resolves.toMatch(res)
  })

  // TODO: check callback resolve to be passed from outside
  test('should thenable on fulfill state have run mockFn function once', () => {
    const mockFn = jest.fn()

    const promise = new Promise<number>((resolve) => {
      setTimeout(() => {
        // TODO: mockFn should be the resolve callback
        mockFn()
        resolve(numRes)
      }, testTime)
    })

    const queryablePromise = makeQueryablePromise(promise)
      .then(() => {
        expect(queryablePromise.state).toBe(PromiseState.FULFILLED)
      })

    expect(mockFn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(testTime)

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(queryablePromise).resolves.toBe(numRes)
  })

  test('should thenable on rejected state be REJECTED', () => {
    const queryablePromise = makeQueryablePromise(promiseReject())
      .catch(() => {
        expect(queryablePromise.state).toBe(PromiseState.REJECTED)
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).rejects.toMatch(rej)
  })

  test('should exist isRejected method and return true on REJECTED', () => {
    const queryablePromise = makeQueryablePromise(promiseReject())
      .catch(() => {
        expect(queryablePromise.isRejected()).toBeTruthy()
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).rejects.toMatch(rej)
  })

  // TODO: check callback reject to be passed from outside
  test('should thenable on rejected state have run mockFn function once', () => {
    const mockFn = jest.fn()

    // eslint-disable-next-line promise/param-names
    const promise = new Promise<number>((_, reject) => {
      setTimeout(() => {
        // TODO: mockFn should be the reject callback
        mockFn()
        reject(numRej)
      }, testTime)
    })

    const queryablePromise = makeQueryablePromise(promise)
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
    const promise = new Promise<string>((resolve) => {
      setTimeout(() => resolve(res), testTime)
    })

    const queryablePromise = makeQueryablePromise(promise)
      .finally(() => {
        expect(queryablePromise.isFulfilled()).toBeTruthy()
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).resolves.toMatch(res)
  })

  // test('should not affect the rejected value when using finally', () => {
  //   const promise = new Promise((_,reject) => {
  //     setTimeout(() => reject(rej), testTime)
  //   })

  //   const queryablePromise = makeQueryablePromise(promise)
  //     .finally(() => {
  //       expect(queryablePromise.isRejected()).toBeTruthy()
  //     })

  //   jest.advanceTimersByTime(testTime)
  //   expect(queryablePromise).rejects.toMatch(rej)
  // })

  test('should Promise allSettled work for makeQueryablePromise state FULFILLED', () => {
    const queryablePromise1 = makeQueryablePromise(promiseResolve())
    const queryablePromise2 = makeQueryablePromise(promiseResolve())
    const queryablePromises = [queryablePromise1, queryablePromise2]

    Promise.allSettled(queryablePromises).then((results) => {
      results.forEach((result) => {
        expect(result?.status).toBe(PromiseState.FULFILLED.toLowerCase())
      })
    })

    jest.advanceTimersByTime(testTime)
  })

  test('should Promise allSettled work for makeQueryablePromise state REJECTED', () => {
    const queryablePromise1 = makeQueryablePromise(promiseReject())
    const queryablePromise2 = makeQueryablePromise(promiseReject())
    const queryablePromises = [queryablePromise1, queryablePromise2]

    Promise.allSettled(queryablePromises).then((results) => {
      results.forEach((result) => {
        expect(result?.status).toBe(PromiseState.REJECTED.toLowerCase())
      })
    })

    jest.advanceTimersByTime(testTime)
  })
})

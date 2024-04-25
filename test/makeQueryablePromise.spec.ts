import PromiseState from 'promiseState'
import makeQueryablePromise from 'makeQueryablePromise'

// ENVIRONMENT CONDITIONS
jest.useFakeTimers()
beforeEach(() => {
  jest.clearAllTimers()
})

// ENVIRONMENT VARIABLES
const testTime = 100
const res = 'makeQueryablePromise hasResolved'
const rej = 'makeQueryablePromise hasRejected'

const promiseResolve = () => {
  return new Promise((resolve,_) => {
    setTimeout(() => resolve(res), testTime)
  })
}

const promiseReject = () => {
  return new Promise((_,reject) => {
    setTimeout(() => reject(rej), testTime)
  })
}

//  UNIT TESTS
describe('unit tests', () => {
  it('should exist and be a function', () => {
    expect(makeQueryablePromise).not.toBeUndefined()
    expect(typeof makeQueryablePromise).toBe('function')
  })

  it("should has state property and 'isState' functions after makeQueryablePromise", () => {
    const queryablePromise = makeQueryablePromise(promiseResolve())
    expect(queryablePromise.state).toHaveProperty
    expect(typeof queryablePromise.isPending).toBe('function')
    expect(typeof queryablePromise.isFulfilled).toBe('function')
    expect(typeof queryablePromise.isRejected).toBe('function')
  })

  it('should thenable on pending currentState be PENDING', () => {
    const queryablePromise = makeQueryablePromise(promiseResolve())
    expect(queryablePromise.state).toBe(PromiseState.PENDING)
  })
})

//  IMPLEMENTATION TESTS
describe('implementation tests', () => {
  it('should exist isPending method and return true on PENDING and false on FULFILLED', () => {
    const queryablePromise = makeQueryablePromise(promiseResolve())
    expect(queryablePromise.isPending()).toBeTruthy()

    queryablePromise
      .then(() => {
        expect(queryablePromise.isPending()).toBeFalsy()
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).resolves.toMatch(res)
  })

  it('should thenable on fulfill state be FULFILLED', () => {
    const queryablePromise = makeQueryablePromise(promiseResolve())
      .then(() => {
        expect(queryablePromise.state).toBe(PromiseState.FULFILLED)
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).resolves.toMatch(res)
  })

  it('should exist isFulfilled method and return true on FULFILLED', () => {
    const queryablePromise = makeQueryablePromise(promiseResolve())
      .then(() => {
        expect(queryablePromise.isFulfilled()).toBeTruthy()
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).resolves.toMatch(res)
  })

  // TODO: check callback resolve to be passed from outside
  it('should thenable on fulfill state have run mockFn function once', () => {
    const mockFn = jest.fn()

    const promise = new Promise((resolve,_) => {
      setTimeout(() => {
          // TODO: mockFn should be the resolve callback
          mockFn()
          resolve(res)
        }, testTime)
      })

    const queryablePromise = makeQueryablePromise(promise)
      .then(() => {
        expect(queryablePromise.state).toBe(PromiseState.FULFILLED)
      })

    expect(mockFn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(testTime)

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(queryablePromise).resolves.toMatch(res)
  })

  it('should thenable on rejected state be REJECTED', () => {
    const queryablePromise = makeQueryablePromise(promiseReject())
      .catch(() => {
        expect(queryablePromise.state).toBe(PromiseState.REJECTED)
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).rejects.toMatch(rej)
  })

  it('should exist isRejected method and return true on REJECTED', () => {
    const queryablePromise = makeQueryablePromise(promiseReject())
      .catch(() => {
        expect(queryablePromise.isRejected()).toBeTruthy()
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).rejects.toMatch(rej)
  })

  // TODO: check callback reject to be passed from outside
  it('should thenable on rejected state have run mockFn function once', () => {
    const mockFn = jest.fn()

    const promise = new Promise((_,reject) => {
      setTimeout(() => {
        // TODO: mockFn should be the reject callback
        mockFn()
        reject(rej)
      }, testTime)
    })

    const queryablePromise = makeQueryablePromise(promise)
      .catch(() => {
        expect(queryablePromise.state).toBe(PromiseState.REJECTED)
      })

    expect(mockFn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(testTime)

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(queryablePromise).rejects.toMatch(rej)
  })

  // TODO: test finally method for cases
  it('should not affect the resolved value when using finally', () => {
    const promise = new Promise((resolve,_) => {
      setTimeout(() => resolve(res), testTime)
    })

    const queryablePromise = makeQueryablePromise(promise)
      .finally(() => {
        expect(queryablePromise.isFulfilled()).toBeTruthy()
      });

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).resolves.toMatch(res)
  })

  // it('should not affect the rejected value when using finally', () => {
  //   const promise = new Promise((_,reject) => {
  //     setTimeout(() => reject(rej), testTime)
  //   })

  //   const queryablePromise = makeQueryablePromise(promise)
  //     // .finally(() => {
  //     //   expect(queryablePromise.isRejected()).toBeTruthy()
  //     // })

  //   jest.advanceTimersByTime(testTime)
  //   expect(queryablePromise).rejects.toMatch(rej)
  // })

  it('should Promise allSettled work for makeQueryablePromise state FULFILLED', () => {
    const queryablePromise_1 = makeQueryablePromise(promiseResolve())
    const queryablePromise_2 = makeQueryablePromise(promiseResolve())
    const queryablePromises = [queryablePromise_1, queryablePromise_2]

    Promise.allSettled(queryablePromises).then((results) => {
      results.forEach((result) => {
        expect(result?.status).toBe(PromiseState.FULFILLED.toLowerCase())
      })
    })

    jest.advanceTimersByTime(testTime)
  })


  it('should Promise allSettled work for makeQueryablePromise state REJECTED', () => {
    const queryablePromise_1 = makeQueryablePromise(promiseReject())
    const queryablePromise_2 = makeQueryablePromise(promiseReject())
    const queryablePromises = [queryablePromise_1, queryablePromise_2]

    Promise.allSettled(queryablePromises).then((results) => {
      results.forEach((result) => {
        expect(result?.status).toBe(PromiseState.REJECTED.toLowerCase())
      })
    })

    jest.advanceTimersByTime(testTime)
  })
})

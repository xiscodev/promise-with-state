import PromiseState from 'promiseState'
import QueryablePromise from 'queryablePromise'

// ENVIRONMENT CONDITIONS
jest.useFakeTimers()
beforeEach(() => {
  jest.clearAllTimers()
})

// ENVIRONMENT VARIABLES
const testTime = 100
const res = 'QueryablePromise hasResolved'
const rej = 'QueryablePromise hasRejected'

const promiseResolve = () => {
  return new QueryablePromise<string>((resolve,_) => {
    setTimeout(() => resolve(res), testTime)
  })
}

const promiseReject = () => {
  return new QueryablePromise<string>((_,reject) => {
    setTimeout(() => reject(rej), testTime)
  })
}

//  UNIT TESTS
describe('unit tests', () => {
  it('should exist', () => {
    expect(QueryablePromise).not.toBeUndefined()
  })

  it('should be instantiable with function', () => {
    const fnExecutor :PromiseExecutor<string> = (resolve, reject) => {}
    const queryablePromise = new QueryablePromise<string>(fnExecutor)
    expect(typeof queryablePromise).toBe('object')
  })

  it("should has state property and 'isState' functions", () => {
    const queryablePromise = promiseResolve()
    expect(typeof queryablePromise.state).toHaveProperty
    expect(typeof queryablePromise.isPending).toBe('function')
    expect(typeof queryablePromise.isFulfilled).toBe('function')
    expect(typeof queryablePromise.isRejected).toBe('function')
  })

  it('should thenable on pending state be PENDING', () => {
    const queryablePromise = promiseResolve()
    expect(queryablePromise.state).toBe(PromiseState.PENDING)
  })
})

//  IMPLEMENTATION TESTS
describe('implementation tests', () => {
  it('should exist isPending method and return true on PENDING and false on FULFILLED', () => {
    const queryablePromise = promiseResolve()
    expect(queryablePromise.isPending()).toBeTruthy()

    queryablePromise
      .then(() => {
        expect(queryablePromise.isPending()).toBeFalsy()
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).resolves.toMatch(res)
  })

  it('should thenable on fulfill state be FULFILLED', () => {
    const queryablePromise = promiseResolve()
      .then(() => {
        expect(queryablePromise.state).toBe(PromiseState.FULFILLED)
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).resolves.toMatch(res)
  })

  it('should exist isFulfilled method and return true on FULFILLED', () => {
    const queryablePromise = promiseResolve()
      .then(() => {
        expect(queryablePromise.isFulfilled()).toBeTruthy()
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).resolves.toMatch(res)
  })

  // TODO: check callback resolve to be passed from outside
  it('should thenable on fulfill state have run mockFn function once', () => {
    const mockFn = jest.fn()

    const queryablePromise = new QueryablePromise((resolve,_) => {
      setTimeout(() => {
        // TODO: mockFn should be the resolve callback
        mockFn()
        resolve(res)
      }, testTime)
    }).then(() => {
      expect(queryablePromise.state).toBe(PromiseState.FULFILLED)
    })

    expect(mockFn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(testTime)

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(queryablePromise).resolves.toMatch(res)
  })

  it('should thenable on rejected state be REJECTED', () => {
    const queryablePromise = promiseReject()
      .catch(() => {
        expect(queryablePromise.state).toBe(PromiseState.REJECTED)
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).rejects.toMatch(rej)
  })

  it('should exist isRejected method and return true on REJECTED', () => {
    const queryablePromise = promiseReject()
      .catch(() => {
        expect(queryablePromise.isRejected()).toBeTruthy()
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).rejects.toMatch(rej)
  })

  // TODO: check callback reject to be passed from outside
  it('should thenable on rejected state have run mockFn function once', () => {
    const mockFn = jest.fn()

    const queryablePromise = new QueryablePromise((_,reject) => {
      setTimeout(() => {
        // TODO: mockFn should be the reject callback
        mockFn()
        reject(rej)
      }, testTime)
    }).catch(() => {
      expect(queryablePromise.state).toBe(PromiseState.REJECTED)
    })

    expect(mockFn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(testTime)

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(queryablePromise).rejects.toMatch(rej)
  })

  // TODO: test finally method for cases
  it('should not affect the resolved value when using finally', () => {
    const queryablePromise = new QueryablePromise((resolve,_) => {
      setTimeout(() => resolve(res), testTime)
    })

    queryablePromise
      .finally(() => {
        expect(queryablePromise.isFulfilled()).toBeTruthy()
      })

    jest.advanceTimersByTime(testTime)
    expect(queryablePromise).resolves.toBe(res)
  })

  // it('should not affect the rejected value when using finally', () => {
  //   const queryablePromise = new QueryablePromise((_,reject) => {
  //     setTimeout(() => reject(rej), testTime)
  //   })

  //   queryablePromise
  //     .finally(() => {
  //       expect(queryablePromise.isRejected()).toBeTruthy()
  //       // expect(queryablePromise.isRejected()).toBeFalsy()
  //     })

  //   jest.advanceTimersByTime(testTime)
  //   expect(queryablePromise).rejects.toBe(rej)
  // })

  it('should Promise allSettled work for QueryablePromise state FULFILLED', () => {
    const queryablePromises = [promiseResolve(), promiseResolve()]

    Promise.allSettled(queryablePromises).then((results) => {
      results.forEach((result) => {
        expect(result?.status).toBe(PromiseState.FULFILLED.toLowerCase())
      })
    })

    jest.advanceTimersByTime(testTime)
  })

  it('should Promise allSettled work for QueryablePromise state REJECTED', () => {
    const queryablePromises = [promiseReject(), promiseReject()]

    Promise.allSettled(queryablePromises).then((results) => {
      results.forEach((result) => {
        expect(result?.status).toBe(PromiseState.REJECTED.toLowerCase())
      })
    })

    jest.advanceTimersByTime(testTime)
  })
})

import QueryablePromise from 'queryablePromise';
import QueryablePromiseState from 'queryablePromiseState';

// ENVIRONMENT VARIABLES
jest.useFakeTimers()

const waitTime = 2000

let queryablePromiseResolve = new QueryablePromise((resolve) => {
  setTimeout(() => {
    resolve()
  }, 1000)
})

let queryablePromiseReject = new QueryablePromise((reject) => {
  setTimeout(() => {
    reject()
  }, 1000)
})

const _resetEnv = () => {
  jest.clearAllTimers()

  queryablePromiseResolve = new QueryablePromise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })

  queryablePromiseReject = new QueryablePromise((reject) => {
    setTimeout(() => {
      reject()
    }, 1000)
  })
}

//  TESTS
describe('QueryablePromise', () => {
  it('should exist', () => {
    expect(QueryablePromise).not.toBeUndefined()
  })

  it('should has resolve static function', () => {
    expect(typeof QueryablePromise.resolve).toBe('function')
  })

  it('should has reject static function', () => {
    expect(typeof QueryablePromise.reject).toBe('function')
  })

  it('should be instantiable with function', () => {
    function callbackExecutor(onFulfill, onReject) {}
    const queryable = new QueryablePromise(callbackExecutor)
    expect(typeof queryable).toBe('object')
  })

  it('should has state property after makeQueryablePromise', () => {
    expect(queryablePromiseResolve.state).toBeDefined()
  })

  it('should has isPending function after makeQueryablePromise', () => {
    expect(typeof queryablePromiseResolve.isPending).toBe('function')
  })

  it('should has isFulfilled function after makeQueryablePromise', () => {
    expect(typeof queryablePromiseResolve.isFulfilled).toBe('function')
  })

  it('should has isRejected function after makeQueryablePromise', () => {
    expect(typeof queryablePromiseResolve.isRejected).toBe('function')
  })

  it('should thenable on pending state be PENDING', () => {
    expect(queryablePromiseResolve.state).toBe(QueryablePromiseState.PENDING)
  })

  it('should thenable on fulfill state be FULFILLED', () => {
    _resetEnv()

    queryablePromiseResolve
      .then(() => {
        expect(queryablePromiseResolve.state).toBe(QueryablePromiseState.FULFILLED)
      })
      .catch()
    
    jest.advanceTimersByTime(waitTime)
  })


  it('should thenable on reject state be REJECTED', () => {
    _resetEnv()

    queryablePromiseReject
    .then()
    .catch(() => {
      expect(queryablePromiseReject.state).toBe(QueryablePromiseState.REJECTED)
    })

    jest.advanceTimersByTime(waitTime)
  })

  it('should exist isPending method and return true on PENDING', () => {
    _resetEnv()

    expect(queryablePromiseResolve.isPending()).toBeTruthy()
  })

  it('should exist isFulfilled method and return true on FULFILLED', () => {
    _resetEnv()

    queryablePromiseResolve
      .then(() => {
        expect(queryablePromiseResolve.isFulfilled()).toBeTruthy()
      })
      .catch()
    
    jest.advanceTimersByTime(waitTime)
  })

  it('should exist isRejected method and return true on REJECTED', () => {
    _resetEnv()

    queryablePromiseReject
    .then()
    .catch(() => {
      expect(queryablePromiseReject.isRejected()).toBeTruthy()
    })

    jest.advanceTimersByTime(waitTime)
  })
})

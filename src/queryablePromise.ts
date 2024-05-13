import PromiseState from 'promiseState'
import PromiseExecutor from 'promiseExecutor'

/**
 * @access public
 * @class
 * @classdesc QueryablePromise that wraps a native Promise and appends a state property and a couple of state query methods.
 */
class QueryablePromise<T> {
  /**
   * @access private
   * @type {Promise}
   * @description Promise which states are been tracked.
   * @memberof QueryablePromise
   */
  private innerPromise: Promise<T>

  /**
   * @access private
   * @type {PromiseState}
   * @description The state of the Promise that is been tracked.
   * @memberof QueryablePromise
   */
  private innerState = PromiseState.PENDING

  /**
   * @access public
   * @param {Function} fnExecutor The native Promise or function which contains fulfill and reject callbacks
   * @description Creates an instance of QueryablePromise.
   * @throws {Error} if the fnExecutor is invalid
   * @constructs
   * @memberof QueryablePromise
   */
  constructor (fnExecutor: Promise<T> | PromiseExecutor<T>) {
    if (fnExecutor instanceof Promise) {
      this.innerPromise = fnExecutor
        .then((result) => {
          this.innerState = PromiseState.FULFILLED
          return result
        })
        .catch((reason) => {
          this.innerState = PromiseState.REJECTED
          throw reason
        })
    } else if (typeof fnExecutor === 'function') {
      const promiseExecutor: PromiseExecutor<T> = (onFulfilled, onRejected) => {
        fnExecutor(
          (value) => {
            this.innerState = PromiseState.FULFILLED
            onFulfilled(value)
          },
          (reason) => {
            this.innerState = PromiseState.REJECTED
            onRejected(reason)
          }
        )
      }
      this.innerPromise = new Promise<T>(promiseExecutor)
    } else {
      throw new Error('The constructor must receive a Promise instance or a Promise executor function')
    }
  }

  /**
   * @access public
   * @param {Function} onFulfilled callback function to run on fulfilled
   * @param {Function} onRejected callback function to run on rejected
   * @function then
   * @description then method refers to promise method.
   * @returns {QueryablePromise} returns class instance
   * @memberof QueryablePromise
   */
  public then<R> (
    onFulfilled: ((value: T) => R | PromiseLike<R>) | null,
    onRejected?: ((reason?: unknown) => R | PromiseLike<R>) | null
  ): QueryablePromise<R> {
    this.innerPromise.then(onFulfilled, onRejected)
    return this as unknown as QueryablePromise<R>
  }

  /**
   * @access public
   * @param {Function} onRejected callback function to run on rejected
   * @function catch
   * @description catch method refers to promise method.
   * @returns {QueryablePromise} returns class instance
   * @memberof QueryablePromise
   */
  public catch<R> (
    onRejected?: ((reason?: unknown) => R | PromiseLike<R>) | null
  ): QueryablePromise<T> {
    this.innerPromise.catch(onRejected)
    return this as unknown as QueryablePromise<T>
  }

  /**
   * @access public
   * @param {Function} onFinally callback function that can run after fulfilled or rejected states
   * @function finally
   * @description finally method refers to promise method.
   * @returns {QueryablePromise} returns class instance
   * @memberof QueryablePromise
   */
  public finally (
    onFinally?: (() => void) | null
  ): QueryablePromise<T> {
    this.innerPromise.finally(onFinally)
    return this as unknown as QueryablePromise<T>
  }

  /**
   * @access public
   * @type {PromiseState}
   * @description Getter for queryable promise state.
   * @returns {PromiseState} contains current promise state
   * @memberof QueryablePromise
   */
  public get state (): PromiseState {
    return this.innerState
  }

  /**
   * @access public
   * @function isPending
   * @description a function that retrieves if queried state is the actual queryable promise state.
   * @returns {boolean} a boolean whether a queryable promise state is PENDING
   * @memberof QueryablePromise
   */
  public isPending (): boolean {
    return this.innerState === PromiseState.PENDING
  }

  /**
   * @access public
   * @function isFulfilled
   * @description a function that retrieves if queried state is the actual queryable promise state.
   * @returns {boolean} a boolean whether a queryable promise state is FULFILLED
   * @memberof QueryablePromise
   */
  public isFulfilled (): boolean {
    return this.innerState === PromiseState.FULFILLED
  }

  /**
   * @access public
   * @function isRejected
   * @description a function that retrieves if queried state is the actual queryable promise state.
   * @returns {boolean} a boolean whether a queryable promise state is REJECTED
   * @memberof QueryablePromise
   */
  public isRejected (): boolean {
    return this.innerState === PromiseState.REJECTED
  }
}

export default QueryablePromise

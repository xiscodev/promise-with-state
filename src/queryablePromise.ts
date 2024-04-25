import PromiseState from 'promiseState'

/**
 * @access public
 * @class
 * @classdesc QueryablePromise extends from native Promise and appends a state property and a couple of state query methods.
 */
class QueryablePromise<T> {
  /**
   * @access private
   * @type {Promise}
   * @description Promise which states are been tracked
   * @memberof QueryablePromise
   */
  private internalPromise: Promise<T>

  /**
   * @access private
   * @type {PromiseState}
   * @description The state of the Promise that is been tracked
   * @memberof QueryablePromise
   */
  private internalState: PromiseState = PromiseState.PENDING


  /**
   * @access private
   * @param {Function} fnExecutor function which contains fulfill and reject resolvers for Promise
   * @description Creates an instance of QueryablePromise.
   * @constructs
   * @memberof QueryablePromise
   */
  constructor (fnExecutor: Promise<T> | PromiseExecutor<T>) {
    if (fnExecutor instanceof Promise) {
      // console.log('Promise')
      this.internalPromise = fnExecutor
        .then((result) => {
          this.internalState = PromiseState.FULFILLED
          return result
        })
        .catch((err) => {
          this.internalState = PromiseState.REJECTED
          throw err
          // return Promise.reject(err)
        })
    } else {
      // console.log('PromiseExecutor')
      this.internalPromise = new Promise<T>((onFulfilled, onRejected) => {
        return fnExecutor(
          (value) => {
            this.internalState = PromiseState.FULFILLED
            return onFulfilled(value)
          },
          (reason) => {
            this.internalState = PromiseState.REJECTED
            return onRejected(reason)
          }
        )
      })
    }
  }

  /**
   * @access public
   * @param {Function} onFulfilled callback function to run on fulfilled
   * @param {Function} onRejected callback function to run on rejected
   * @function then
   * @description then method refers to promise method
   * @returns {QueryablePromise} returns class instance
   * @memberof QueryablePromise
   */
  public then<R> (
    onFulfilled: (value: T) => R,
    onRejected?: (reason?: unknown) => R
  ): QueryablePromise<R> {
    this.internalPromise.then(onFulfilled, onRejected)
    return this as unknown as QueryablePromise<R>
  }

  /**
   * @access public
   * @param {Function} onRejected callback function to run on rejected
   * @function catch
   * @description catch method refers to promise method
   * @returns {QueryablePromise} returns class instance
   * @memberof QueryablePromise
   */
  public catch<R> (
    onRejected?: (reason?: unknown) => R
  ): QueryablePromise<T> {
    this.internalPromise.catch(onRejected)
    return this
  }

  /**
   * @access public
   * @param {Function} onFinally callback function that can run after fulfilled or rejected
   * @function finally
   * @description catch method refers to promise method
   * @returns {QueryablePromise} returns class instance
   * @memberof QueryablePromise
   */
  public finally (
    onFinally?: () => void
  ): QueryablePromise<T> {
    this.internalPromise.finally(onFinally)
    return this
  }

  /**
   * @access public
   * @type {PromiseState}
   * @description Getter for queryable promise state.
   * @returns {PromiseState} contains current promise state
   * @memberof QueryablePromise
   */
  public get state (): PromiseState {
    return this.internalState
  }

  /**
   * @access public
   * @function isPending
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is PENDING
   * @memberof QueryablePromise
   */
  public isPending (): boolean {
    return this.internalState === PromiseState.PENDING
  }

  /**
   * @access public
   * @function isFulfilled
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is FULFILLED
   * @memberof QueryablePromise
   */
  public isFulfilled (): boolean {
    return this.internalState === PromiseState.FULFILLED
  }

  /**
   * @access public
   * @function isRejected
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is REJECTED
   * @memberof QueryablePromise
   */
  public isRejected (): boolean {
    return this.internalState === PromiseState.REJECTED
  }
}

export default QueryablePromise

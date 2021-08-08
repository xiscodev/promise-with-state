import QueryablePromiseState from 'queryablePromiseState'

const _queryable = Symbol('QueryablePromise')
const _compositeThen = fn => x => (fn(x), x)

/**
 * @access public
 * @class
 * @classdesc QueryablePromise extends from native Promise and appends a state property and a couple of state query methods.
 */
class QueryablePromise {
  private _state: string
  /**
   * @access private
   * @param {Function} fnExecutor function which contains fulfill and reject resolvers for Promise
   * @description Creates an instance of QueryablePromise.
   * @constructs
   * @memberof QueryablePromise
   */
  constructor (fnExecutor: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void) {
    this[_queryable] = this._promiseWrapper(fnExecutor)
  }

  /**
   * @access public
   * @function resolve
   * @description then method refers to promise method
   * @param {any} x the result value of resolve
   * @returns {QueryablePromise} the resolve instance of the class
   * @memberof QueryablePromise
   * @static
   */
  public static resolve (x?: any): QueryablePromise {
    return new QueryablePromise(
      (onFulfill) => onFulfill(x)
    )
  }

  /**
   * @access public
   * @function reject
   * @description then method refers to promise method
   * @param {any} y the reason or message error
   * @returns {QueryablePromise} the reject instance of the class
   * @memberof QueryablePromise
   * @static
   */
  public static reject (y?: any): QueryablePromise {
    return new QueryablePromise(
      (_, onReject) => onReject(y)
    )
  }

  /**
   * @access private
   * @function _promiseWrapper
   * @description creates and merge _state property in promise flow
   * @param {any} exec is the promise executor function
   * @returns {Promise} the reject instance of the class
   * @memberof QueryablePromise
   * @static
   */
  private _promiseWrapper (exec: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void): Promise<any> {
    this._state = QueryablePromiseState.PENDING
    return new Promise(exec)
      .then(_compositeThen(
        () => {
          this._state = QueryablePromiseState.FULFILLED
        })
      )
      .catch(
        err => {
          this._state = QueryablePromiseState.REJECTED
          return Promise.reject(err)
        }
      )
  }

  /**
   * @access public
   * @type {string}
   * @description the property [Symbol.toStringTag] included in Promise
   * @returns {QueryablePromise} returns class instance
   * @memberof QueryablePromise
   */
  public get [Symbol.toStringTag] (): string {
    return 'QueryablePromise'
  }

  /**
   * @access public
   * @function then
   * @description then method refers to promise method
   * @param {any} fn method accepts a callback function
   * @returns {QueryablePromise} returns class instance
   * @memberof QueryablePromise
   */
  public then (fn?: (value?: any) => any): QueryablePromise {
    this[_queryable].then(fn)
    return this
  }

  /**
   * @access public
   * @function catch
   * @description catch method refers to promise method
   * @param {any} fn method accepts a callback function
   * @returns {QueryablePromise} returns class instance
   * @memberof QueryablePromise
   */
  public catch (fn?: (value?: any) => any): QueryablePromise {
    this[_queryable].catch(fn)
    return this
  }

  /**
   * @access public
   * @function finally
   * @description catch method refers to promise method
   * @param {any} fn method accepts a callback function
   * @returns {QueryablePromise} returns class instance
   * @memberof QueryablePromise
   */
  public finally (fn?: (value?: void) => void): QueryablePromise {
    this[_queryable].finally(fn)
    return this
  }

  /**
   * @access public
   * @type {QueryablePromiseState}
   * @description Getter for queryable promise state.
   * @returns {QueryablePromiseState} contains current promise state
   * @memberof QueryablePromise
   */
  public get state (): string {
    return this._state
  }

  /**
   * @access public
   * @function isPending
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is PENDING
   * @memberof QueryablePromise
   */
  public isPending (): boolean {
    return this._state === QueryablePromiseState.PENDING
  }

  /**
   * @access public
   * @function isFulfilled
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is FULFILLED
   * @memberof QueryablePromise
   */
  public isFulfilled (): boolean {
    return this._state === QueryablePromiseState.FULFILLED
  }

  /**
   * @access public
   * @function isRejected
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is REJECTED
   * @memberof QueryablePromise
   */
  public isRejected (): boolean {
    return this._state === QueryablePromiseState.REJECTED
  }
}

export default QueryablePromise

import QueryablePromiseState from 'queryablePromiseState'

/**
 * @access public
 * @class
 * @classdesc QueryablePromise extends from native Promise and appends a state property and a couple of state query methods.
 */
class QueryablePromise extends Promise<any> {
  private _state: string
  /**
   * @access private
   * @param {CallableFunction} executor function which contains fulfill and reject resolvers for Promise
   * @description Creates an instance of QueryablePromise.
   * @constructs
   * @memberof QueryablePromise
   */
  constructor (executor: CallableFunction) {
    super((onFulfill, onReject) => executor(
      resolution => {
        this._state = QueryablePromiseState.FULFILLED
        onFulfill(resolution)
      },
      rejection => {
        this._state = QueryablePromiseState.REJECTED
        onReject(rejection)
      }
    ))
    this._state = QueryablePromiseState.PENDING
  }

  /**
   * @access public
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

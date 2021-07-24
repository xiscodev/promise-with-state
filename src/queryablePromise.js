import QueryablePromiseState from 'queryablePromiseState'

/**
 * @access public
 * @class
 * @classdesc QueryablePromise extends from native Promise and appends a state property and a couple of state query methods.
 */
class QueryablePromise extends Promise {
  /**
   * @access private
   * @param {Promise} thenable promise or thanable which contains fulfill and reject resolvers
   * @description Creates an instance of QueryablePromise.
   * @constructs
   * @memberof QueryablePromise
   */
  constructor (thenable) {
    super((fulfill, reject) => thenable(
      resolution => {
        fulfill(resolution)
        this._state = QueryablePromiseState.FULFILLED
      },
      rejection => {
        reject(rejection)
        this._state = QueryablePromiseState.REJECTED
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
  get state () {
    return this._state
  }

  /**
   * @access public
   * @function isPending
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is PENDING
   * @memberof QueryablePromise
   */
  isPending () {
    return this._state === QueryablePromiseState.PENDING
  }

  /**
   * @access public
   * @function isFulfilled
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is FULFILLED
   * @memberof QueryablePromise
   */
  isFulfilled () {
    return this._state === QueryablePromiseState.FULFILLED
  }

  /**
   * @access public
   * @function isRejected
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is REJECTED
   * @memberof QueryablePromise
   */
  isRejected () {
    return this._state === QueryablePromiseState.REJECTED
  }
}

export default QueryablePromise

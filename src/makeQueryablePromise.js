import QueryablePromiseState from 'queryablePromiseState'
import { isPromise, isUndefined } from 'the-type-validator'

/**
 * @access public
 * @function makeQueryablePromise
 * @description Transform any promise to queryable promise
 * @param {Promise} thenable the promise to be transformed
 * @returns {Promise} enhanced with state and state query methods
 */
const makeQueryablePromise = (thenable) => {
  if (!isPromise(thenable)) {
    throw new Error('argument is not a Promise')
  }

  if (!isUndefined(thenable.state)) {
    return thenable
  }

  thenable
    .then(resolution => {
      thenable.state = QueryablePromiseState.FULFILLED
      return resolution
    })
    .catch(rejection => {
      thenable.state = QueryablePromiseState.REJECTED
      return rejection
    })

  /**
   * @access public
   * @description The queryable promise state.
   * @returns {QueryablePromiseState} contains current promise state
   * @memberof makeQueryablePromise
   */
  thenable.state = QueryablePromiseState.PENDING

  /**
   * @access public
   * @function isPending
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is PENDING
   * @memberof makeQueryablePromise
   */
  thenable.isPending = function() {
    return thenable.state === QueryablePromiseState.PENDING
  }

  /**
   * @access public
   * @function isFulfilled
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is FULFILLED
   * @memberof makeQueryablePromise
   */
  thenable.isFulfilled = function() {
    return thenable.state === QueryablePromiseState.FULFILLED
  }

  /**
   * @access public
   * @function isRejected
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is REJECTED
   * @memberof makeQueryablePromise
   */
  thenable.isRejected = function() {
    return thenable.state === QueryablePromiseState.REJECTED
  }

  return thenable
}

export default makeQueryablePromise

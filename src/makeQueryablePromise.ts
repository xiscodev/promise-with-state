import QueryablePromiseState from 'queryablePromiseState'

const baseQueryableThenable: any = {
  /**
   * @access private
   * @description The queryable promise state.
   * @returns {string} contains current promise state
   * @memberof makeQueryablePromise
   */
  state: QueryablePromiseState.PENDING,

  /**
   * @access public
   * @function isPending
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is PENDING
   * @memberof makeQueryablePromise
   */
  isPending (): boolean {
    return this.state === QueryablePromiseState.PENDING
  },

  /**
   * @access public
   * @function isFulfilled
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is FULFILLED
   * @memberof makeQueryablePromise
   */
  isFulfilled (): boolean {
    return this.state === QueryablePromiseState.FULFILLED
  },

  /**
   * @access public
   * @function isRejected
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is REJECTED
   * @memberof makeQueryablePromise
   */
  isRejected (): boolean {
    return this.state === QueryablePromiseState.REJECTED
  },
}

/**
 * @access public
 * @function makeQueryablePromise
 * @description Transform any promise to queryable promise.
 * @param {Promise} thenable the promise to be transformed
 * @returns {any} a promise enhanced with state query methods
 */
function makeQueryablePromise (thenable: Promise<any>): any {
  const queryableThenable: any = Object.assign(thenable, baseQueryableThenable)

  queryableThenable
    .then((result) => {
      queryableThenable.state = QueryablePromiseState.FULFILLED
      // console.log(1, queryableThenable)
      return result
    })
    .catch((error) => {
      queryableThenable.state = QueryablePromiseState.REJECTED
      // console.log(2, queryableThenable)
      return error
    })

  return queryableThenable
}

export default makeQueryablePromise

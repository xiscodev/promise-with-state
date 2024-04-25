import QueryablePromise from 'queryablePromise'

/**
 * @access public
 * @function makeQueryablePromise
 * @description Takes a native Promise and returns a QueryablePromise with state and query methods.
 * @param {Function} fnExecutor - The native Promise to be converted.
 * @returns {QueryablePromise} A QueryablePromise instance with state and query methods.
 */
function makeQueryablePromise<T> (fnExecutor: Promise<T> | PromiseExecutor<T>): QueryablePromise<T> {
  return new QueryablePromise<T>(fnExecutor)
}

export default makeQueryablePromise

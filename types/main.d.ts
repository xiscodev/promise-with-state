/**
 * @access public
 * @description Contains queryable promise states
 */
declare enum PromiseState {
    /**
     * @access public
     * @description Promise state PENDING for queryable promise
     * @constant {PromiseState}
     */
    PENDING = 'PENDING',
    /**
     * @access public
     * @description Promise state FULFILLED for queryable promise
     * @constant {PromiseState}
     */
    FULFILLED = 'FULFILLED',
    /**
     * @access public
     * @description Promise state REJECTED for queryable promise
     * @constant {PromiseState}
     */
    REJECTED = 'REJECTED'
}
/**
 * @access public
 * @description Type for Promise core executor function
 */
type PromiseExecutor<T> = (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void;
/**
 * @access public
 * @class
 * @classdesc QueryablePromise extends from native Promise and appends a state property and a couple of state query methods.
 */
declare class QueryablePromise<T> {
  private internalState
  private internalPromise
  /**
   * @access private
   * @param {Promise<T> | PromiseExecutor<T>} fnExecutor function which contains fulfill and reject resolvers for Promise
   * @description Creates an instance of QueryablePromise.
   * @constructs
   * @memberof QueryablePromise
   */
  constructor(fnExecutor: Promise<T> | PromiseExecutor<T>);
  /**
   * @access public
   * @param {Function} onFulfilled callback function to run on fulfilled
   * @param {Function} onRejected callback function to run on rejected
   * @function then
   * @description then method refers to promise method
   * @returns {QueryablePromise} returns class instance
   * @memberof QueryablePromise
   */
  then<R>(onFulfilled: (value: T) => R, onRejected?: (reason?: unknown) => R): QueryablePromise<R>;
  /**
   * @access public
   * @param {Function} onRejected callback function to run on rejected
   * @function catch
   * @description catch method refers to promise method
   * @returns {QueryablePromise} returns class instance
   * @memberof QueryablePromise
   */
  catch<R>(onRejected?: (reason?: unknown) => R): QueryablePromise<T>;
  /**
   * @access public
   * @param {Function} onFinally callback function that can run after fulfilled or rejected
   * @function finally
   * @description catch method refers to promise method
   * @returns {QueryablePromise} returns class instance
   * @memberof QueryablePromise
   */
  finally(onFinally?: () => void): QueryablePromise<T>;
  /**
   * @access public
   * @type {PromiseState}
   * @description Getter for queryable promise state.
   * @returns {PromiseState} contains current promise state
   * @memberof QueryablePromise
   */
  get state(): PromiseState;
  /**
   * @access public
   * @function isPending
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is PENDING
   * @memberof QueryablePromise
   */
  isPending(): boolean;
  /**
   * @access public
   * @function isFulfilled
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is FULFILLED
   * @memberof QueryablePromise
   */
  isFulfilled(): boolean;
  /**
   * @access public
   * @function isRejected
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is REJECTED
   * @memberof QueryablePromise
   */
  isRejected(): boolean;
}
/**
 * @access public
 * @function makeQueryablePromise
 * @description Takes a native Promise and returns a QueryablePromise with state and query methods.
 * @param {Promise<T> | PromiseExecutor<T>} fnExecutor - The native Promise to be converted.
 * @returns {QueryablePromise<T>} A QueryablePromise instance with state and query methods.
 */
declare function makeQueryablePromise<T>(fnExecutor: Promise<T> | PromiseExecutor<T>): QueryablePromise<T>;

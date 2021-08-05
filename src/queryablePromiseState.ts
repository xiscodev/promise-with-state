/**
 * @access public
 * @description Contains queryable promise states
 * @constant {object}
 */
const QueryablePromiseState = {
  /**
   * @access public
   * @description Promise state PENDING for queryable
   * @constant {QueryablePromiseState}
   */
  PENDING: 'PENDING',

  /**
   * @access public
   * @description Promise state FULFILLED for queryable
   * @constant {QueryablePromiseState}
   */
  FULFILLED: 'FULFILLED',

  /**
   * @access public
   * @description Promise state REJECTED for queryable
   * @constant {QueryablePromiseState}
   */
  REJECTED: 'REJECTED',
}

export default QueryablePromiseState

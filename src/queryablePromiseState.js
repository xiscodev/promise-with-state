/**
 * @access public
 * @description Contains queryable promise states
 * @constant {object}
 */
const QueryablePromiseState = {
  /**
   * @access public
   * @description Promise state PENDING for queryable
   * @constant {string}
   */
  PENDING: 'PENDING',

  /**
   * @access public
   * @description Promise state FULFILLED for queryable
   * @constant {string}
   */
  FULFILLED: 'FULFILLED',

  /**
   * @access public
   * @description Promise state REJECTED for queryable
   * @constant {string}
   */
  REJECTED: 'REJECTED',
}

export default QueryablePromiseState

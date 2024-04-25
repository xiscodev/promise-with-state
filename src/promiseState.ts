/**
 * @access public
 * @description Contains queryable promise states
 */
enum PromiseState {
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

export default PromiseState

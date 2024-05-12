/**
 * @access public
 * @description describes what a promise executor should look like
 */
type PromiseExecutor<T> = (
  fulfill: (value: T | PromiseLike<T>) => void,
  reject: (reason?: unknown) => void
) => void

export default PromiseExecutor

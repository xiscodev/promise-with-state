/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/makeQueryablePromise.ts":
/*!*************************************!*\
  !*** ./src/makeQueryablePromise.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var queryablePromiseState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! queryablePromiseState */ "./src/queryablePromiseState.ts");

var baseQueryableThenable = {
  /**
   * @access private
   * @description The queryable promise state.
   * @returns {string} contains current promise state
   * @memberof makeQueryablePromise
   */
  state: queryablePromiseState__WEBPACK_IMPORTED_MODULE_0__.default.PENDING,

  /**
   * @access public
   * @function isPending
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is PENDING
   * @memberof makeQueryablePromise
   */
  isPending: function isPending() {
    return this.state === queryablePromiseState__WEBPACK_IMPORTED_MODULE_0__.default.PENDING;
  },

  /**
   * @access public
   * @function isFulfilled
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is FULFILLED
   * @memberof makeQueryablePromise
   */
  isFulfilled: function isFulfilled() {
    return this.state === queryablePromiseState__WEBPACK_IMPORTED_MODULE_0__.default.FULFILLED;
  },

  /**
   * @access public
   * @function isRejected
   * @description retrieves true if queried state is actual queryable promise state.
   * @returns {boolean} true when queryable promise state is REJECTED
   * @memberof makeQueryablePromise
   */
  isRejected: function isRejected() {
    return this.state === queryablePromiseState__WEBPACK_IMPORTED_MODULE_0__.default.REJECTED;
  }
};
/**
 * @access public
 * @function makeQueryablePromise
 * @description Transform any promise to queryable promise.
 * @param {Promise} thenable the promise to be transformed
 * @returns {any} a promise enhanced with state query methods
 */

function makeQueryablePromise(thenable) {
  var queryableThenable = Object.assign(thenable, baseQueryableThenable);
  queryableThenable.then(function (result) {
    queryableThenable.state = queryablePromiseState__WEBPACK_IMPORTED_MODULE_0__.default.FULFILLED; // console.log(1, queryableThenable)

    return result;
  })["catch"](function (error) {
    queryableThenable.state = queryablePromiseState__WEBPACK_IMPORTED_MODULE_0__.default.REJECTED; // console.log(2, queryableThenable)

    return error;
  });
  return queryableThenable;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (makeQueryablePromise);

/***/ }),

/***/ "./src/queryablePromise.ts":
/*!*********************************!*\
  !*** ./src/queryablePromise.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var queryablePromiseState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! queryablePromiseState */ "./src/queryablePromiseState.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var _queryable = Symbol('QueryablePromise');

var _compositeThen = function _compositeThen(fn) {
  return function (x) {
    return fn(x), x;
  };
};
/**
 * @access public
 * @class
 * @classdesc QueryablePromise extends from native Promise and appends a state property and a couple of state query methods.
 */


var QueryablePromise = /*#__PURE__*/function (_Symbol$toStringTag) {
  /**
   * @access private
   * @param {Function} fnExecutor function which contains fulfill and reject resolvers for Promise
   * @description Creates an instance of QueryablePromise.
   * @constructs
   * @memberof QueryablePromise
   */
  function QueryablePromise(fnExecutor) {
    _classCallCheck(this, QueryablePromise);

    this[_queryable] = this._promiseWrapper(fnExecutor);
  }
  /**
   * @access public
   * @function resolve
   * @description then method refers to promise method
   * @param {any} x the result value of resolve
   * @returns {QueryablePromise} the resolve instance of the class
   * @memberof QueryablePromise
   * @static
   */


  _createClass(QueryablePromise, [{
    key: "_promiseWrapper",
    value:
    /**
     * @access private
     * @function _promiseWrapper
     * @description creates and merge _state property in promise flow
     * @param {any} exec is the promise executor function
     * @returns {Promise} the reject instance of the class
     * @memberof QueryablePromise
     * @static
     */
    function _promiseWrapper(exec) {
      var _this = this;

      this._state = queryablePromiseState__WEBPACK_IMPORTED_MODULE_0__.default.PENDING;
      return new Promise(exec).then(_compositeThen(function () {
        _this._state = queryablePromiseState__WEBPACK_IMPORTED_MODULE_0__.default.FULFILLED;
      }))["catch"](function (err) {
        _this._state = queryablePromiseState__WEBPACK_IMPORTED_MODULE_0__.default.REJECTED;
        return Promise.reject(err);
      });
    }
    /**
     * @access public
     * @type {string}
     * @description the property [Symbol.toStringTag] included in Promise
     * @returns {QueryablePromise} returns class instance
     * @memberof QueryablePromise
     */

  }, {
    key: _Symbol$toStringTag,
    get: function get() {
      return 'QueryablePromise';
    }
    /**
     * @access public
     * @function then
     * @description then method refers to promise method
     * @param {any} fn method accepts a callback function
     * @returns {QueryablePromise} returns class instance
     * @memberof QueryablePromise
     */

  }, {
    key: "then",
    value: function then(fn) {
      this[_queryable].then(fn);

      return this;
    }
    /**
     * @access public
     * @function catch
     * @description catch method refers to promise method
     * @param {any} fn method accepts a callback function
     * @returns {QueryablePromise} returns class instance
     * @memberof QueryablePromise
     */

  }, {
    key: "catch",
    value: function _catch(fn) {
      this[_queryable]["catch"](fn);

      return this;
    }
    /**
     * @access public
     * @function finally
     * @description catch method refers to promise method
     * @param {any} fn method accepts a callback function
     * @returns {QueryablePromise} returns class instance
     * @memberof QueryablePromise
     */

  }, {
    key: "finally",
    value: function _finally(fn) {
      this[_queryable]["finally"](fn);

      return this;
    }
    /**
     * @access public
     * @type {QueryablePromiseState}
     * @description Getter for queryable promise state.
     * @returns {QueryablePromiseState} contains current promise state
     * @memberof QueryablePromise
     */

  }, {
    key: "state",
    get: function get() {
      return this._state;
    }
    /**
     * @access public
     * @function isPending
     * @description retrieves true if queried state is actual queryable promise state.
     * @returns {boolean} true when queryable promise state is PENDING
     * @memberof QueryablePromise
     */

  }, {
    key: "isPending",
    value: function isPending() {
      return this._state === queryablePromiseState__WEBPACK_IMPORTED_MODULE_0__.default.PENDING;
    }
    /**
     * @access public
     * @function isFulfilled
     * @description retrieves true if queried state is actual queryable promise state.
     * @returns {boolean} true when queryable promise state is FULFILLED
     * @memberof QueryablePromise
     */

  }, {
    key: "isFulfilled",
    value: function isFulfilled() {
      return this._state === queryablePromiseState__WEBPACK_IMPORTED_MODULE_0__.default.FULFILLED;
    }
    /**
     * @access public
     * @function isRejected
     * @description retrieves true if queried state is actual queryable promise state.
     * @returns {boolean} true when queryable promise state is REJECTED
     * @memberof QueryablePromise
     */

  }, {
    key: "isRejected",
    value: function isRejected() {
      return this._state === queryablePromiseState__WEBPACK_IMPORTED_MODULE_0__.default.REJECTED;
    }
  }], [{
    key: "resolve",
    value: function resolve(x) {
      return new QueryablePromise(function (onFulfill) {
        return onFulfill(x);
      });
    }
    /**
     * @access public
     * @function reject
     * @description then method refers to promise method
     * @param {any} y the reason or message error
     * @returns {QueryablePromise} the reject instance of the class
     * @memberof QueryablePromise
     * @static
     */

  }, {
    key: "reject",
    value: function reject(y) {
      return new QueryablePromise(function (_, onReject) {
        return onReject(y);
      });
    }
  }]);

  return QueryablePromise;
}(Symbol.toStringTag);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QueryablePromise);

/***/ }),

/***/ "./src/queryablePromiseState.ts":
/*!**************************************!*\
  !*** ./src/queryablePromiseState.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @access public
 * @description Contains queryable promise states
 * @constant {object}
 */
var QueryablePromiseState = {
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
  REJECTED: 'REJECTED'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QueryablePromiseState);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var makeQueryablePromise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! makeQueryablePromise */ "./src/makeQueryablePromise.ts");
/* harmony import */ var queryablePromise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! queryablePromise */ "./src/queryablePromise.ts");
/* harmony import */ var queryablePromiseState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! queryablePromiseState */ "./src/queryablePromiseState.ts");



exports.QueryablePromiseState = queryablePromiseState__WEBPACK_IMPORTED_MODULE_2__.default;
exports.QueryablePromise = queryablePromise__WEBPACK_IMPORTED_MODULE_1__.default;
exports.makeQueryablePromise = makeQueryablePromise__WEBPACK_IMPORTED_MODULE_0__.default;
})();

/******/ })()
;
//# sourceMappingURL=main.js.map
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
/* harmony import */ var queryablePromise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! queryablePromise */ "./src/queryablePromise.ts");


/**
 * @access public
 * @function makeQueryablePromise
 * @description Takes a native Promise and returns a QueryablePromise with state and query methods.
 * @param {Function} fnExecutor - The native Promise to be converted.
 * @returns {QueryablePromise} A QueryablePromise instance with state and query methods.
 */
function makeQueryablePromise(fnExecutor) {
  return new queryablePromise__WEBPACK_IMPORTED_MODULE_0__["default"](fnExecutor);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (makeQueryablePromise);

/***/ }),

/***/ "./src/promiseState.ts":
/*!*****************************!*\
  !*** ./src/promiseState.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @access public
 * @description Contains queryable promise states
 */
var PromiseState = /*#__PURE__*/function (PromiseState) {
  PromiseState["PENDING"] = "PENDING";
  PromiseState["FULFILLED"] = "FULFILLED";
  PromiseState["REJECTED"] = "REJECTED";
  return PromiseState;
}(PromiseState || {});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PromiseState);

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
/* harmony import */ var promiseState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! promiseState */ "./src/promiseState.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


/**
 * @access public
 * @class
 * @classdesc QueryablePromise extends from native Promise and appends a state property and a couple of state query methods.
 */
var QueryablePromise = /*#__PURE__*/function () {
  /**
   * @access private
   * @param {Function} fnExecutor function which contains fulfill and reject resolvers for Promise
   * @description Creates an instance of QueryablePromise.
   * @constructs
   * @memberof QueryablePromise
   */
  function QueryablePromise(fnExecutor) {
    var _this = this;
    _classCallCheck(this, QueryablePromise);
    /**
     * @access private
     * @type {Promise}
     * @description Promise which states are been tracked
     * @memberof QueryablePromise
     */
    /**
     * @access private
     * @type {PromiseState}
     * @description The state of the Promise that is been tracked
     * @memberof QueryablePromise
     */
    _defineProperty(this, "internalState", promiseState__WEBPACK_IMPORTED_MODULE_0__["default"].PENDING);
    if (fnExecutor instanceof Promise) {
      // console.log('Promise')
      this.internalPromise = fnExecutor.then(function (result) {
        _this.internalState = promiseState__WEBPACK_IMPORTED_MODULE_0__["default"].FULFILLED;
        return result;
      })["catch"](function (err) {
        _this.internalState = promiseState__WEBPACK_IMPORTED_MODULE_0__["default"].REJECTED;
        throw err;
        // return Promise.reject(err)
      });
    } else {
      // console.log('PromiseExecutor')
      this.internalPromise = new Promise(function (onFulfilled, onRejected) {
        return fnExecutor(function (value) {
          _this.internalState = promiseState__WEBPACK_IMPORTED_MODULE_0__["default"].FULFILLED;
          return onFulfilled(value);
        }, function (reason) {
          _this.internalState = promiseState__WEBPACK_IMPORTED_MODULE_0__["default"].REJECTED;
          return onRejected(reason);
        });
      });
    }
  }

  /**
   * @access public
   * @param {Function} onFulfilled callback function to run on fulfilled
   * @param {Function} onRejected callback function to run on rejected
   * @function then
   * @description then method refers to promise method
   * @returns {QueryablePromise} returns class instance
   * @memberof QueryablePromise
   */
  return _createClass(QueryablePromise, [{
    key: "then",
    value: function then(onFulfilled, onRejected) {
      this.internalPromise.then(onFulfilled, onRejected);
      return this;
    }

    /**
     * @access public
     * @param {Function} onRejected callback function to run on rejected
     * @function catch
     * @description catch method refers to promise method
     * @returns {QueryablePromise} returns class instance
     * @memberof QueryablePromise
     */
  }, {
    key: "catch",
    value: function _catch(onRejected) {
      this.internalPromise["catch"](onRejected);
      return this;
    }

    /**
     * @access public
     * @param {Function} onFinally callback function that can run after fulfilled or rejected
     * @function finally
     * @description catch method refers to promise method
     * @returns {QueryablePromise} returns class instance
     * @memberof QueryablePromise
     */
  }, {
    key: "finally",
    value: function _finally(onFinally) {
      this.internalPromise["finally"](onFinally);
      return this;
    }

    /**
     * @access public
     * @type {PromiseState}
     * @description Getter for queryable promise state.
     * @returns {PromiseState} contains current promise state
     * @memberof QueryablePromise
     */
  }, {
    key: "state",
    get: function get() {
      return this.internalState;
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
      return this.internalState === promiseState__WEBPACK_IMPORTED_MODULE_0__["default"].PENDING;
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
      return this.internalState === promiseState__WEBPACK_IMPORTED_MODULE_0__["default"].FULFILLED;
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
      return this.internalState === promiseState__WEBPACK_IMPORTED_MODULE_0__["default"].REJECTED;
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QueryablePromise);

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
/* harmony import */ var promiseState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! promiseState */ "./src/promiseState.ts");
/* harmony import */ var queryablePromise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! queryablePromise */ "./src/queryablePromise.ts");
/* harmony import */ var makeQueryablePromise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! makeQueryablePromise */ "./src/makeQueryablePromise.ts");



exports.PromiseState = promiseState__WEBPACK_IMPORTED_MODULE_0__["default"];
exports.QueryablePromise = queryablePromise__WEBPACK_IMPORTED_MODULE_1__["default"];
exports.makeQueryablePromise = makeQueryablePromise__WEBPACK_IMPORTED_MODULE_2__["default"];
})();

/******/ })()
;
//# sourceMappingURL=main.js.map
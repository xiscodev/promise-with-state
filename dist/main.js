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
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


/**
 * @access public
 * @class
 * @classdesc QueryablePromise extends from native Promise and appends a state property and a couple of state query methods.
 */

var QueryablePromise = /*#__PURE__*/function (_Promise) {
  _inherits(QueryablePromise, _Promise);

  var _super = _createSuper(QueryablePromise);

  /**
   * @access private
   * @param {CallableFunction} executor function which contains fulfill and reject resolvers for Promise
   * @description Creates an instance of QueryablePromise.
   * @constructs
   * @memberof QueryablePromise
   */
  function QueryablePromise(executor) {
    var _this;

    _classCallCheck(this, QueryablePromise);

    _this = _super.call(this, function (onFulfill, onReject) {
      return executor(function (resolution) {
        _this._state = queryablePromiseState__WEBPACK_IMPORTED_MODULE_0__.default.FULFILLED;
        onFulfill(resolution);
      }, function (rejection) {
        _this._state = queryablePromiseState__WEBPACK_IMPORTED_MODULE_0__.default.REJECTED;
        onReject(rejection);
      });
    });
    _this._state = queryablePromiseState__WEBPACK_IMPORTED_MODULE_0__.default.PENDING;
    return _this;
  }
  /**
   * @access public
   * @description Getter for queryable promise state.
   * @returns {QueryablePromiseState} contains current promise state
   * @memberof QueryablePromise
   */


  _createClass(QueryablePromise, [{
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
  }]);

  return QueryablePromise;
}( /*#__PURE__*/_wrapNativeSuper(Promise));

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
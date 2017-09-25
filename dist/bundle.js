/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _k = __webpack_require__(1);

var _k2 = _interopRequireDefault(_k);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var callback = function callback(newVal, oldVal) {
  console.log(newVal + '/' + oldVal);
};

var obj = {
  a: 'str_a',
  b: 1,
  c: [1, 2, 3],
  d: {
    e: {
      f: 'str_g'
    }
  }
};

new _k2.default(obj, callback);

console.log(obj.a);
obj.a = {
  new: 'new_a'
};
console.log(obj.a.new);
obj.a.new = 'new_b';
console.log(obj.a.new);
// obj.b = 11
// obj.c.push(4)
// obj.d.e.f = 'gg'

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var objectProto = Object.prototype;

var K = function () {
  function K(obj, callback) {
    _classCallCheck(this, K);

    if (objectProto.toString.call(obj) !== '[object Object]') {
      throw Error('not a object');
    }

    this.$callback = callback;
    this.observe(obj);
  }

  _createClass(K, [{
    key: 'observe',
    value: function observe(obj) {
      var _this = this;

      var _loop = function _loop(key) {
        var oldVal = obj[key];

        // console.log(key, obj, obj[key])
        Object.defineProperty(obj, key, {
          get: function get() {
            // console.log(oldVal)
            return oldVal;
          },
          set: function set(newVal) {
            if (newVal !== oldVal) {
              if (objectProto.toString.call(newVal) === '[object Object]') {
                _this.observe(newVal);
              }

              _this.$callback(newVal, oldVal);
              oldVal = newVal;
            }
          }
        });

        if (objectProto.toString.call(oldVal) === '[object Object]') {
          _this.observe(oldVal);
        }
      };

      // console.log(obj)
      for (var key in obj) {
        _loop(key);
      }
    }
  }]);

  return K;
}();

exports.default = K;

/***/ })
/******/ ]);
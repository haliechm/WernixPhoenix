'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isBrowser = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && (typeof document === 'undefined' ? 'undefined' : _typeof(document)) === 'object' && (typeof navigator === 'undefined' ? 'undefined' : _typeof(navigator)) === 'object';

exports.default = function () {
  if (isBrowser) {
    var _Swiper = require('swiper');
    return typeof _Swiper.default !== 'undefined' ? _Swiper.default : _Swiper;
  }
  return function Swiper() {};
}();
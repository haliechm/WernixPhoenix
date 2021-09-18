"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* flow */
var cleanStateKey = function cleanStateKey(key) {
  return key === null || typeof key === 'undefined' ? 'main' : key.toString();
};

var _default = cleanStateKey;
exports["default"] = _default;
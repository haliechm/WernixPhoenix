"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getStateKey = function getStateKey(renderedElement) {
  return typeof renderedElement.ref === 'string' ? renderedElement.ref : renderedElement.key;
};

var _default = getStateKey;
exports["default"] = _default;
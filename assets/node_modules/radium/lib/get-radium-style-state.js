"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getRadiumStyleState = function getRadiumStyleState(component) {
  return component._lastRadiumState || component.state && component.state._radiumStyleState || {};
};

var _default = getRadiumStyleState;
exports["default"] = _default;
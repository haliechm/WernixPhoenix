"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cleanStateKey = _interopRequireDefault(require("./clean-state-key"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getState = function getState(state, elementKey, value) {
  var key = (0, _cleanStateKey["default"])(elementKey);
  return !!state && !!state._radiumStyleState && !!state._radiumStyleState[key] && state._radiumStyleState[key][value];
};

var _default = getState;
exports["default"] = _default;
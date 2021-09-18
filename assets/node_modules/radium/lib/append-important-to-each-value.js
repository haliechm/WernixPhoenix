"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = appendImportantToEachValue;

var _appendPxIfNeeded = _interopRequireDefault(require("./append-px-if-needed"));

var _mapObject = _interopRequireDefault(require("./map-object"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function appendImportantToEachValue(style) {
  return (0, _mapObject["default"])(style, function (result, key) {
    return (0, _appendPxIfNeeded["default"])(key, style[key]) + ' !important';
  });
}
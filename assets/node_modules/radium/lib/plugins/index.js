"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _checkPropsPlugin = _interopRequireDefault(require("./check-props-plugin"));

var _keyframesPlugin = _interopRequireDefault(require("./keyframes-plugin"));

var _mergeStyleArrayPlugin = _interopRequireDefault(require("./merge-style-array-plugin"));

var _prefixPlugin = _interopRequireDefault(require("./prefix-plugin"));

var _removeNestedStylesPlugin = _interopRequireDefault(require("./remove-nested-styles-plugin"));

var _resolveInteractionStylesPlugin = _interopRequireDefault(require("./resolve-interaction-styles-plugin"));

var _resolveMediaQueriesPlugin = _interopRequireDefault(require("./resolve-media-queries-plugin"));

var _visitedPlugin = _interopRequireDefault(require("./visited-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable block-scoped-const */
var _default = {
  checkProps: _checkPropsPlugin["default"],
  keyframes: _keyframesPlugin["default"],
  mergeStyleArray: _mergeStyleArrayPlugin["default"],
  prefix: _prefixPlugin["default"],
  removeNestedStyles: _removeNestedStylesPlugin["default"],
  resolveInteractionStyles: _resolveInteractionStylesPlugin["default"],
  resolveMediaQueries: _resolveMediaQueriesPlugin["default"],
  visited: _visitedPlugin["default"]
};
exports["default"] = _default;
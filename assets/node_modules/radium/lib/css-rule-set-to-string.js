"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cssRuleSetToString;

var _appendPxIfNeeded = _interopRequireDefault(require("./append-px-if-needed"));

var _camelCasePropsToDashCase = _interopRequireDefault(require("./camel-case-props-to-dash-case"));

var _mapObject = _interopRequireDefault(require("./map-object"));

var _prefixer = require("./prefixer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function createMarkupForStyles(style) {
  return Object.keys(style).map(function (property) {
    return property + ': ' + style[property] + ';';
  }).join('\n');
}

function cssRuleSetToString(selector, rules, userAgent) {
  if (!rules) {
    return '';
  }

  var rulesWithPx = (0, _mapObject["default"])(rules, function (value, key) {
    return (0, _appendPxIfNeeded["default"])(key, value);
  });
  var prefixedRules = (0, _prefixer.getPrefixedStyle)(rulesWithPx, userAgent);
  var cssPrefixedRules = (0, _camelCasePropsToDashCase["default"])(prefixedRules);
  var serializedRules = createMarkupForStyles(cssPrefixedRules);
  return selector + '{' + serializedRules + '}';
}
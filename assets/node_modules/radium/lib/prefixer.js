"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrefixedKeyframes = getPrefixedKeyframes;
exports.getPrefixedStyle = getPrefixedStyle;

var _createPrefixer = _interopRequireDefault(require("inline-style-prefixer/static/createPrefixer"));

var _createPrefixer2 = _interopRequireDefault(require("inline-style-prefixer/dynamic/createPrefixer"));

var _exenv = _interopRequireDefault(require("exenv"));

var _static = _interopRequireDefault(require("./prefix-data/static"));

var _dynamic = _interopRequireDefault(require("./prefix-data/dynamic"));

var _camelCasePropsToDashCase = require("./camel-case-props-to-dash-case");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var prefixAll = (0, _createPrefixer["default"])(_static["default"]);
var InlineStylePrefixer = (0, _createPrefixer2["default"])(_dynamic["default"], prefixAll);

function transformValues(style) {
  return Object.keys(style).reduce(function (newStyle, key) {
    var value = style[key];

    if (Array.isArray(value)) {
      value = value.join(';' + key + ':');
    } else if (value && _typeof(value) === 'object' && typeof value.toString === 'function') {
      value = value.toString();
    }

    newStyle[key] = value;
    return newStyle;
  }, {});
} // Flatten prefixed values that are arrays to strings.
//
// We get prefixed styles back in the form of:
// - `display: "flex"` OR
// - `display: "-webkit-flex"` OR
// - `display: [/* ... */, "-webkit-flex", "flex"]
//
// The last form is problematic for eventual use in the browser and server
// render. More confusingly, we have to do **different** things on the
// browser and server (noted inline below).
//
// https://github.com/FormidableLabs/radium/issues/958


function flattenStyleValues(style) {
  return Object.keys(style).reduce(function (newStyle, key) {
    var val = style[key];

    if (Array.isArray(val)) {
      if (_exenv["default"].canUseDOM) {
        // For the **browser**, when faced with multiple values, we just take
        // the **last** one, which is the original passed in value before
        // prefixing. This _should_ work, because `inline-style-prefixer`
        // we're just passing through what would happen without ISP.
        val = val[val.length - 1].toString();
      } else {
        // For the **server**, we just concatenate things together and convert
        // the style object values into a hacked-up string of like `display:
        // "-webkit-flex;display:flex"` that will SSR render correctly to like
        // `"display:-webkit-flex;display:flex"` but would otherwise be
        // totally invalid values.
        // We convert keys to dash-case only for the serialize values and
        // leave the real key camel-cased so it's as expected to React and
        // other parts of the processing chain.
        val = val.join(";".concat((0, _camelCasePropsToDashCase.camelCaseToDashCase)(key), ":"));
      }
    }

    newStyle[key] = val;
    return newStyle;
  }, {});
}

var _hasWarnedAboutUserAgent = false;

var _lastUserAgent;

var _cachedPrefixer;

function getPrefixer(userAgent) {
  var actualUserAgent = userAgent || global && global.navigator && global.navigator.userAgent;

  if (process.env.NODE_ENV !== 'production') {
    if (!actualUserAgent && !_hasWarnedAboutUserAgent) {
      /* eslint-disable no-console */
      console.warn('Radium: userAgent should be supplied for server-side rendering. See ' + 'https://github.com/FormidableLabs/radium/tree/master/docs/api#radium ' + 'for more information.');
      /* eslint-enable no-console */

      _hasWarnedAboutUserAgent = true;
    }
  }

  if (process.env.NODE_ENV === 'test' || !_cachedPrefixer || actualUserAgent !== _lastUserAgent) {
    if (actualUserAgent === 'all') {
      _cachedPrefixer = {
        prefix: prefixAll,
        prefixedKeyframes: 'keyframes'
      };
    } else {
      _cachedPrefixer = new InlineStylePrefixer({
        userAgent: actualUserAgent
      });
    }

    _lastUserAgent = actualUserAgent;
  }

  return _cachedPrefixer;
}

function getPrefixedKeyframes(userAgent) {
  return getPrefixer(userAgent).prefixedKeyframes || 'keyframes';
} // Returns a new style object with vendor prefixes added to property names and
// values.


function getPrefixedStyle(style, userAgent) {
  var styleWithFallbacks = transformValues(style);
  var prefixer = getPrefixer(userAgent);
  var prefixedStyle = prefixer.prefix(styleWithFallbacks);
  var flattenedStyle = flattenStyleValues(prefixedStyle);
  return flattenedStyle;
}
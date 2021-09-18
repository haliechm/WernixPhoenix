"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Plugins", {
  enumerable: true,
  get: function get() {
    return _plugins["default"];
  }
});
Object.defineProperty(exports, "Style", {
  enumerable: true,
  get: function get() {
    return _style["default"];
  }
});
Object.defineProperty(exports, "StyleRoot", {
  enumerable: true,
  get: function get() {
    return _styleRoot["default"];
  }
});
Object.defineProperty(exports, "getState", {
  enumerable: true,
  get: function get() {
    return _getState["default"];
  }
});
Object.defineProperty(exports, "keyframes", {
  enumerable: true,
  get: function get() {
    return _keyframes["default"];
  }
});
exports["default"] = void 0;

var _enhancer = _interopRequireDefault(require("./enhancer"));

var _plugins = _interopRequireDefault(require("./plugins"));

var _style = _interopRequireDefault(require("./components/style"));

var _styleRoot = _interopRequireDefault(require("./components/style-root"));

var _getState = _interopRequireDefault(require("./get-state"));

var _keyframes = _interopRequireDefault(require("./keyframes"));

var _resolveStyles = _interopRequireDefault(require("./resolve-styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Radium(ComposedComponent) {
  return (0, _enhancer["default"])(ComposedComponent);
} // Legacy object support.
//
// Normally it would be disfavored to attach these to the `Radium` object
// because it defeats tree-shaking, using instead the ESM exports. But,
// the `Radium` `Enhancer` uses **all** of these, so there's no extra "cost"
// to them being explicitly on the `Radium` object.


Radium.Plugins = _plugins["default"];
Radium.Style = _style["default"];
Radium.StyleRoot = _styleRoot["default"];
Radium.getState = _getState["default"];
Radium.keyframes = _keyframes["default"];

if (process.env.NODE_ENV !== 'production') {
  Radium.TestMode = {
    clearState: _resolveStyles["default"].__clearStateForTests,
    disable: _resolveStyles["default"].__setTestMode.bind(null, false),
    enable: _resolveStyles["default"].__setTestMode.bind(null, true)
  };
}

var _default = Radium; // ESM re-exports

exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withRadiumContexts = withRadiumContexts;
exports.RadiumConfigContext = exports.StyleKeeperContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _styleKeeper = _interopRequireDefault(require("./style-keeper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var StyleKeeperContext = _react["default"].createContext(undefined);

exports.StyleKeeperContext = StyleKeeperContext;

var RadiumConfigContext = _react["default"].createContext(undefined);

exports.RadiumConfigContext = RadiumConfigContext;

function withRadiumContexts(WrappedComponent) {
  var WithRadiumContexts = _react["default"].forwardRef(function (props, ref) {
    var radiumConfigContext = (0, _react.useContext)(RadiumConfigContext);
    var styleKeeperContext = (0, _react.useContext)(StyleKeeperContext);
    return _react["default"].createElement(WrappedComponent, _extends({
      ref: ref
    }, props, {
      radiumConfigContext: radiumConfigContext,
      styleKeeperContext: styleKeeperContext
    }));
  });

  WithRadiumContexts.displayName = "withRadiumContexts(".concat(WrappedComponent.displayName || WrappedComponent.name || 'Component', ")");
  return (0, _hoistNonReactStatics["default"])(WithRadiumContexts, WrappedComponent);
}
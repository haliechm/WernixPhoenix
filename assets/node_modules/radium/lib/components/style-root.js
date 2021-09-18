"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _enhancer = _interopRequireDefault(require("../enhancer"));

var _styleKeeper = _interopRequireDefault(require("../style-keeper"));

var _styleSheet = _interopRequireDefault(require("./style-sheet"));

var _context = require("../context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function getStyleKeeper(configProp, configContext) {
  var userAgent = configProp && configProp.userAgent || configContext && configContext.userAgent;
  return new _styleKeeper["default"](userAgent);
}

var StyleRootInner = (0, _enhancer["default"])(function (_ref) {
  var children = _ref.children,
      otherProps = _objectWithoutProperties(_ref, ["children"]);

  return _react["default"].createElement("div", otherProps, children, _react["default"].createElement(_styleSheet["default"], null));
});

var StyleRoot = function StyleRoot(props) {
  /* eslint-disable no-unused-vars */
  // Pass down all props except config to the rendered div.

  /* eslint-enable no-unused-vars */
  var radiumConfig = props.radiumConfig;
  var configContext = (0, _react.useContext)(_context.RadiumConfigContext);
  var styleKeeper = (0, _react.useRef)(getStyleKeeper(radiumConfig, configContext));
  return _react["default"].createElement(_context.StyleKeeperContext.Provider, {
    value: styleKeeper.current
  }, _react["default"].createElement(StyleRootInner, props));
};

var _default = StyleRoot;
exports["default"] = _default;
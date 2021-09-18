"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cssRuleSetToString = _interopRequireDefault(require("../css-rule-set-to-string"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _context = require("../context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Style =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Style, _PureComponent);

  function Style() {
    _classCallCheck(this, Style);

    return _possibleConstructorReturn(this, _getPrototypeOf(Style).apply(this, arguments));
  }

  _createClass(Style, [{
    key: "_buildStyles",
    value: function _buildStyles(styles) {
      var _this = this;

      var userAgent = this.props.radiumConfig && this.props.radiumConfig.userAgent || this.props.radiumConfigContext && this.props.radiumConfigContext.userAgent;
      var scopeSelector = this.props.scopeSelector;
      var rootRules = Object.keys(styles).reduce(function (accumulator, selector) {
        if (_typeof(styles[selector]) !== 'object') {
          accumulator[selector] = styles[selector];
        }

        return accumulator;
      }, {});
      var rootStyles = Object.keys(rootRules).length ? (0, _cssRuleSetToString["default"])(scopeSelector || '', rootRules, userAgent) : '';
      return rootStyles + Object.keys(styles).reduce(function (accumulator, selector) {
        var rules = styles[selector];

        if (selector === 'mediaQueries') {
          accumulator += _this._buildMediaQueryString(rules);
        } else if (_typeof(styles[selector]) === 'object') {
          var completeSelector = scopeSelector ? selector.split(',').map(function (part) {
            return scopeSelector + ' ' + part.trim();
          }).join(',') : selector;
          accumulator += (0, _cssRuleSetToString["default"])(completeSelector, rules, userAgent);
        }

        return accumulator;
      }, '');
    }
  }, {
    key: "_buildMediaQueryString",
    value: function _buildMediaQueryString(stylesByMediaQuery) {
      var _this2 = this;

      var mediaQueryString = '';
      Object.keys(stylesByMediaQuery).forEach(function (query) {
        mediaQueryString += '@media ' + query + '{' + _this2._buildStyles(stylesByMediaQuery[query]) + '}';
      });
      return mediaQueryString;
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.props.rules) {
        return null;
      }

      var styles = this._buildStyles(this.props.rules);

      return _react["default"].createElement("style", {
        dangerouslySetInnerHTML: {
          __html: styles
        }
      });
    }
  }]);

  return Style;
}(_react.PureComponent);

Style.propTypes = {
  radiumConfig: _propTypes["default"].object,
  rules: _propTypes["default"].object,
  scopeSelector: _propTypes["default"].string
};
Style.defaultProps = {
  scopeSelector: ''
};

var _default = (0, _context.withRadiumContexts)(Style);

exports["default"] = _default;
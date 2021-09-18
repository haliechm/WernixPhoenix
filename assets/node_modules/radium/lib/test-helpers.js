"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRenderOutput = getRenderOutput;
exports.renderFcIntoDocument = renderFcIntoDocument;
exports.getElement = getElement;
exports.getElements = getElements;
exports.expectCSS = expectCSS;
exports.expectColor = expectColor;
exports.createEsClass = createEsClass;

var _color = _interopRequireDefault(require("color"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _testUtils = _interopRequireDefault(require("react-dom/test-utils"));

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

function getRenderOutput(element) {
  var renderer = new _shallow["default"]();
  renderer.render(element);
  return renderer.getRenderOutput();
}

var Wrapper =
/*#__PURE__*/
function (_Component) {
  _inherits(Wrapper, _Component);

  function Wrapper() {
    _classCallCheck(this, Wrapper);

    return _possibleConstructorReturn(this, _getPrototypeOf(Wrapper).apply(this, arguments));
  }

  _createClass(Wrapper, [{
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return Wrapper;
}(_react.Component);

function renderFcIntoDocument(element) {
  return _testUtils["default"].renderIntoDocument(_react["default"].createElement(Wrapper, null, element));
}

function getElement(output, tagName) {
  return _reactDom["default"].findDOMNode(_testUtils["default"].findRenderedDOMComponentWithTag(output, tagName));
}

function getElements(output, tagName) {
  return _testUtils["default"].scryRenderedDOMComponentsWithTag(output, tagName).map(function (component) {
    return _reactDom["default"].findDOMNode(component);
  });
}

function cleanCSS(css) {
  return css.replace(/\s*\n\s*/g, '').replace(/\s*([{};:,])\s*/g, '$1');
}

function expectCSS(styleElement, css) {
  // strip newlines and excess whitespace from both to normalize browsers.
  // IE9, for instance, does not include new lines in innerText.
  // Also allows us to write our expected CSS cleanly, without worring about the
  // format of the actual output.
  expect(cleanCSS(styleElement.innerText)).to.equal(cleanCSS(css));
}

function expectColor(actual, expected) {
  expect((0, _color["default"])(actual).hex()).to.equal((0, _color["default"])(expected).hex());
}

function createEsClass(renderFn) {
  var Composed =
  /*#__PURE__*/
  function (_Component2) {
    _inherits(Composed, _Component2);

    function Composed() {
      _classCallCheck(this, Composed);

      return _possibleConstructorReturn(this, _getPrototypeOf(Composed).apply(this, arguments));
    }

    _createClass(Composed, [{
      key: "render",
      value: function render() {
        return renderFn() || _react["default"].createElement("div", null);
      }
    }]);

    return Composed;
  }(_react.Component);

  return Composed;
}
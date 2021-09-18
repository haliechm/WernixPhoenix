function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import Color from 'color';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import TestUtils from 'react-dom/test-utils';
export function getRenderOutput(element) {
  var renderer = new ShallowRenderer();
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
}(Component);

export function renderFcIntoDocument(element) {
  return TestUtils.renderIntoDocument(React.createElement(Wrapper, null, element));
}
export function getElement(output, tagName) {
  return ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(output, tagName));
}
export function getElements(output, tagName) {
  return TestUtils.scryRenderedDOMComponentsWithTag(output, tagName).map(function (component) {
    return ReactDOM.findDOMNode(component);
  });
}

function cleanCSS(css) {
  return css.replace(/\s*\n\s*/g, '').replace(/\s*([{};:,])\s*/g, '$1');
}

export function expectCSS(styleElement, css) {
  // strip newlines and excess whitespace from both to normalize browsers.
  // IE9, for instance, does not include new lines in innerText.
  // Also allows us to write our expected CSS cleanly, without worring about the
  // format of the actual output.
  expect(cleanCSS(styleElement.innerText)).to.equal(cleanCSS(css));
}
export function expectColor(actual, expected) {
  expect(Color(actual).hex()).to.equal(Color(expected).hex());
}
export function createEsClass(renderFn) {
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
        return renderFn() || React.createElement("div", null);
      }
    }]);

    return Composed;
  }(Component);

  return Composed;
}
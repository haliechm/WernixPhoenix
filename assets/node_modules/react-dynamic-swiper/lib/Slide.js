'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Slide;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// NOTE: The Slide component should be thought of as a light wrapper for content.
// Consider the use of fragments below, adding things like an `click` handler, or
// any other DOM event handlers through React properties will simply not work.
// Should this trigger a warning?
function Slide(_ref) {
  var children = _ref.children,
      className = _ref.className,
      onActive = _ref.onActive,
      _ref$isPortaled = _ref.isPortaled,
      isPortaled = _ref$isPortaled === undefined ? false : _ref$isPortaled,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'onActive', 'isPortaled']);

  if (isPortaled) {
    return _react2.default.createElement(
      _react2.default.Fragment,
      null,
      children
    );
  }

  return _react2.default.createElement(
    'div',
    _extends({ className: (0, _classnames2.default)('swiper-slide', className) }, rest),
    children
  );
}

Slide._isReactDynamicSwiperSlide = true;

Slide.propTypes = {
  onActive: _propTypes2.default.func,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  isPortaled: _propTypes2.default.bool
};
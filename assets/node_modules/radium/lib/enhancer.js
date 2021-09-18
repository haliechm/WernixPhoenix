"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = enhanceWithRadium;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _resolveStyles2 = _interopRequireDefault(require("./resolve-styles"));

var _getRadiumStyleState = _interopRequireDefault(require("./get-radium-style-state"));

var _context = require("./context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES = ['arguments', 'callee', 'caller', 'length', 'name', 'prototype', 'type'];
var RADIUM_PROTO;
var RADIUM_METHODS;

function copyProperties(source, target) {
  Object.getOwnPropertyNames(source).forEach(function (key) {
    if (KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES.indexOf(key) < 0 && !target.hasOwnProperty(key)) {
      var descriptor = Object.getOwnPropertyDescriptor(source, key);
      descriptor && Object.defineProperty(target, key, descriptor);
    }
  });
} // Handle scenarios of:
// - Inherit from `React.Component` in any fashion
//   See: https://github.com/FormidableLabs/radium/issues/738
// - There's an explicit `render` field defined


function isStateless(component) {
  var proto = component.prototype || {};
  return !component.isReactComponent && !proto.isReactComponent && !component.render && !proto.render;
} // Check if value is a real ES class in Native / Node code.
// See: https://stackoverflow.com/a/30760236


function isNativeClass(component) {
  return typeof component === 'function' && /^\s*class\s+/.test(component.toString());
} // Handle es7 arrow functions on React class method names by detecting
// and transfering the instance method to original class prototype.
// (Using a copy of the class).
// See: https://github.com/FormidableLabs/radium/issues/738


function copyArrowFuncs(enhancedSelf, ComposedComponent) {
  RADIUM_METHODS.forEach(function (name) {
    var thisDesc = Object.getOwnPropertyDescriptor(enhancedSelf, name);
    var thisMethod = (thisDesc || {}).value; // Only care if have instance method.

    if (!thisMethod) {
      return;
    }

    var radiumDesc = Object.getOwnPropertyDescriptor(RADIUM_PROTO, name);
    var radiumProtoMethod = (radiumDesc || {}).value;
    var superProtoMethod = ComposedComponent.prototype[name]; // Allow transfer when:
    // 1. have an instance method
    // 2. the super class prototype doesn't have any method
    // 3. it is not already the radium prototype's

    if (!superProtoMethod && thisMethod !== radiumProtoMethod) {
      // Transfer dynamic render component to Component prototype (copy).
      thisDesc && Object.defineProperty(ComposedComponent.prototype, name, thisDesc); // Remove instance property, leaving us to have a contrived
      // inheritance chain of (1) radium, (2) superclass.

      delete enhancedSelf[name];
    }
  });
}

function trimRadiumState(enhancer) {
  if (enhancer._extraRadiumStateKeys && enhancer._extraRadiumStateKeys.length > 0) {
    var trimmedRadiumState = enhancer._extraRadiumStateKeys.reduce(function (state, key) {
      // eslint-disable-next-line no-unused-vars
      var extraStateKey = state[key],
          remainingState = _objectWithoutProperties(state, [key].map(_toPropertyKey));

      return remainingState;
    }, (0, _getRadiumStyleState["default"])(enhancer));

    enhancer._lastRadiumState = trimmedRadiumState;
    enhancer.setState({
      _radiumStyleState: trimmedRadiumState
    });
  }
}

function cleanUpEnhancer(enhancer) {
  var _radiumMouseUpListener = enhancer._radiumMouseUpListener,
      _radiumMediaQueryListenersByQuery = enhancer._radiumMediaQueryListenersByQuery;
  enhancer._radiumIsMounted = false;

  if (_radiumMouseUpListener) {
    _radiumMouseUpListener.remove();
  }

  if (_radiumMediaQueryListenersByQuery) {
    Object.keys(_radiumMediaQueryListenersByQuery).forEach(function (query) {
      _radiumMediaQueryListenersByQuery[query].remove();
    }, enhancer);
  }
}

function resolveConfig(propConfig, contextConfig, hocConfig) {
  var config = propConfig || contextConfig || hocConfig;

  if (hocConfig && config !== hocConfig) {
    config = _objectSpread({}, hocConfig, config);
  }

  return config;
}

function renderRadiumComponent(enhancer, renderedElement, resolvedConfig, propConfig) {
  var _resolveStyles = (0, _resolveStyles2["default"])(enhancer, renderedElement, resolvedConfig),
      extraStateKeyMap = _resolveStyles.extraStateKeyMap,
      element = _resolveStyles.element;

  enhancer._extraRadiumStateKeys = Object.keys(extraStateKeyMap);

  if (propConfig) {
    return _react["default"].createElement(_context.RadiumConfigContext.Provider, {
      value: propConfig
    }, element);
  }

  return element;
}

function createEnhancedFunctionComponent(origComponent, config) {
  var RadiumEnhancer = _react["default"].forwardRef(function (props, ref) {
    var radiumConfig = props.radiumConfig,
        otherProps = _objectWithoutProperties(props, ["radiumConfig"]);

    var radiumConfigContext = (0, _react.useContext)(_context.RadiumConfigContext);
    var styleKeeperContext = (0, _react.useContext)(_context.StyleKeeperContext);

    var _useState = (0, _react.useState)({
      _radiumStyleState: {}
    }),
        _useState2 = _slicedToArray(_useState, 2),
        state = _useState2[0],
        setState = _useState2[1];

    var enhancerApi = (0, _react.useRef)({
      state: state,
      setState: setState,
      _radiumMediaQueryListenersByQuery: undefined,
      _radiumMouseUpListener: undefined,
      _radiumIsMounted: true,
      _lastRadiumState: undefined,
      _extraRadiumStateKeys: undefined,
      _radiumStyleKeeper: styleKeeperContext
    }).current; // result of useRef is never recreated and is designed to be mutable
    // we need to make sure the latest state is attached to it

    enhancerApi.state = state;
    (0, _react.useEffect)(function () {
      return function () {
        cleanUpEnhancer(enhancerApi);
      };
    }, [enhancerApi]);
    var hasExtraStateKeys = enhancerApi._extraRadiumStateKeys && enhancerApi._extraRadiumStateKeys.length > 0;
    (0, _react.useEffect)(function () {
      trimRadiumState(enhancerApi);
    }, [hasExtraStateKeys, enhancerApi]);
    var renderedElement = origComponent(otherProps, ref);
    var currentConfig = resolveConfig(radiumConfig, radiumConfigContext, config);
    return renderRadiumComponent(enhancerApi, renderedElement, currentConfig, radiumConfig);
  });

  RadiumEnhancer._isRadiumEnhanced = true;
  RadiumEnhancer.defaultProps = origComponent.defaultProps;
  return (0, _hoistNonReactStatics["default"])(RadiumEnhancer, origComponent);
}

function createEnhancedClassComponent(origComponent, ComposedComponent, config) {
  var RadiumEnhancer =
  /*#__PURE__*/
  function (_ComposedComponent) {
    _inherits(RadiumEnhancer, _ComposedComponent);

    // need to attempt to assign to this.state in case
    // super component is setting state on construction,
    // otherwise class properties reinitialize to undefined
    // need to assign the following methods to this.xxx as
    // tests attempt to set this on the original component
    function RadiumEnhancer() {
      var _this;

      _classCallCheck(this, RadiumEnhancer);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(RadiumEnhancer).apply(this, arguments));
      _this.state = _this.state || {};
      _this._radiumStyleKeeper = _this.props.styleKeeperContext;
      _this._radiumMediaQueryListenersByQuery = _this._radiumMediaQueryListenersByQuery;
      _this._radiumMouseUpListener = _this._radiumMouseUpListener;
      _this._radiumIsMounted = true;
      _this._lastRadiumState = void 0;
      _this._extraRadiumStateKeys = void 0;
      _this.state._radiumStyleState = {};

      var self = _assertThisInitialized(_this); // Handle es7 arrow functions on React class method


      copyArrowFuncs(self, ComposedComponent);
      return _this;
    }

    _createClass(RadiumEnhancer, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState, snapshot) {
        if (_get(_getPrototypeOf(RadiumEnhancer.prototype), "componentDidUpdate", this)) {
          _get(_getPrototypeOf(RadiumEnhancer.prototype), "componentDidUpdate", this).call(this, prevProps, prevState, snapshot);
        }

        trimRadiumState(this);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (_get(_getPrototypeOf(RadiumEnhancer.prototype), "componentWillUnmount", this)) {
          _get(_getPrototypeOf(RadiumEnhancer.prototype), "componentWillUnmount", this).call(this);
        }

        cleanUpEnhancer(this);
      }
    }, {
      key: "render",
      value: function render() {
        var renderedElement = _get(_getPrototypeOf(RadiumEnhancer.prototype), "render", this).call(this);

        var currentConfig = resolveConfig(this.props.radiumConfig, this.props.radiumConfigContext, config);
        return renderRadiumComponent(this, renderedElement, currentConfig, this.props.radiumConfig);
      }
    }]);

    return RadiumEnhancer;
  }(ComposedComponent); // Lazy infer the method names of the Enhancer.


  RadiumEnhancer._isRadiumEnhanced = true;
  RADIUM_PROTO = RadiumEnhancer.prototype;
  RADIUM_METHODS = Object.getOwnPropertyNames(RADIUM_PROTO).filter(function (n) {
    return n !== 'constructor' && typeof RADIUM_PROTO[n] === 'function';
  }); // Class inheritance uses Object.create and because of __proto__ issues
  // with IE <10 any static properties of the superclass aren't inherited and
  // so need to be manually populated.
  // See http://babeljs.io/docs/advanced/caveats/#classes-10-and-below-

  copyProperties(origComponent, RadiumEnhancer);

  if (process.env.NODE_ENV !== 'production') {
    // This also fixes React Hot Loader by exposing the original components top
    // level prototype methods on the Radium enhanced prototype as discussed in
    // https://github.com/FormidableLabs/radium/issues/219.
    copyProperties(ComposedComponent.prototype, RadiumEnhancer.prototype);
  } // add Radium propTypes to enhanced component's propTypes


  if (RadiumEnhancer.propTypes && RadiumEnhancer.propTypes.style) {
    RadiumEnhancer.propTypes = _objectSpread({}, RadiumEnhancer.propTypes, {
      style: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object])
    });
  } // copy display name to enhanced component


  RadiumEnhancer.displayName = origComponent.displayName || origComponent.name || 'Component';
  return (0, _context.withRadiumContexts)(RadiumEnhancer);
}

function createComposedFromNativeClass(ComposedComponent) {
  ComposedComponent = function (OrigComponent) {
    function NewComponent() {
      // Use Reflect.construct to simulate 'new'
      var obj = Reflect.construct(OrigComponent, arguments, this.constructor);
      return obj;
    } // $FlowFixMe


    Reflect.setPrototypeOf(NewComponent.prototype, OrigComponent.prototype); // $FlowFixMe

    Reflect.setPrototypeOf(NewComponent, OrigComponent);
    return NewComponent;
  }(ComposedComponent);

  return ComposedComponent;
}

var ReactForwardRefSymbol = (0, _react.forwardRef)(function () {
  return null;
}).$$typeof;

function enhanceWithRadium(configOrComposedComponent) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (ReactForwardRefSymbol && configOrComposedComponent.$$typeof === ReactForwardRefSymbol) {
    return createEnhancedFunctionComponent(configOrComposedComponent.render, config);
  }

  if (typeof configOrComposedComponent !== 'function') {
    return createFactoryFromConfig(config, configOrComposedComponent);
  }

  var origComponent = configOrComposedComponent; // Handle stateless components

  if (isStateless(origComponent)) {
    return createEnhancedFunctionComponent(origComponent, config);
  }

  var _ComposedComponent2 = origComponent; // Radium is transpiled in npm, so it isn't really using es6 classes at
  // runtime.  However, the user of Radium might be.  In this case we have
  // to maintain forward compatibility with native es classes.

  if (isNativeClass(_ComposedComponent2)) {
    _ComposedComponent2 = createComposedFromNativeClass(_ComposedComponent2);
  } // Shallow copy composed if still original (we may mutate later).


  if (_ComposedComponent2 === origComponent) {
    _ComposedComponent2 =
    /*#__PURE__*/
    function (_ComposedComponent3) {
      _inherits(ComposedComponent, _ComposedComponent3);

      function ComposedComponent() {
        _classCallCheck(this, ComposedComponent);

        return _possibleConstructorReturn(this, _getPrototypeOf(ComposedComponent).apply(this, arguments));
      }

      return ComposedComponent;
    }(_ComposedComponent2);
  }

  return createEnhancedClassComponent(origComponent, _ComposedComponent2, config);
}

function createFactoryFromConfig(config, configOrComposedComponent) {
  var newConfig = _objectSpread({}, config, configOrComposedComponent);

  return function (configOrComponent) {
    return enhanceWithRadium(configOrComponent, newConfig);
  };
}
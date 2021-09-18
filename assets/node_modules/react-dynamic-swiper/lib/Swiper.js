'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _SwiperLib = require('./SwiperLib');

var _SwiperLib2 = _interopRequireDefault(_SwiperLib);

var _Slide = require('./Slide');

var _Slide2 = _interopRequireDefault(_Slide);

var _swiperEvents = require('./swiperEvents');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FuncElementType = _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]);
var BoolOrFuncElementType = _propTypes2.default.oneOfType([_propTypes2.default.bool, FuncElementType]);

var Swiper = function (_Component) {
  _inherits(Swiper, _Component);

  function Swiper() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Swiper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Swiper.__proto__ || Object.getPrototypeOf(Swiper)).call.apply(_ref, [this].concat(args))), _this), _this._swiper = null, _this._nextButton = null, _this._prevButton = null, _this._pagination = null, _this._scrollBar = null, _this._container = null, _this._slidesCount = 0, _this._activeIndex = 0, _this.state = {
      swiper: null,
      duplicates: []

      /**
       * Initialize Swiper instance.
       * @private
       */
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Keep a reference of the `_swiper` in state so we can re-render when
   * it changes.
   */


  _createClass(Swiper, [{
    key: '_initSwiper',
    value: function _initSwiper() {
      var _this2 = this;

      var _props = this.props,
          swiperOptions = _props.swiperOptions,
          navigation = _props.navigation,
          pagination = _props.pagination,
          scrollBar = _props.scrollBar,
          onInitSwiper = _props.onInitSwiper,
          paginationClickable = _props.paginationClickable,
          loop = _props.loop;

      var opts = {};

      if (pagination) {
        opts.pagination = opts.pagination || {};
        _extends(opts.pagination, {
          el: this._pagination,
          clickable: paginationClickable || false
        });
      }
      if (scrollBar) {
        opts.scrollbar = opts.scrollbar || {};
        _extends(opts.scrollbar, {
          el: this._scrollBar
        });
      }
      if (navigation) {
        opts.navigation = opts.navigation || {};
        _extends(opts.navigation, {
          prevEl: this._prevButton,
          nextEl: this._nextButton
        });
      }
      if (loop) {
        opts.loop = true;
      } else {
        if (opts.loop) {
          throw new Error('react-dynamic-swiper: Do not use "loop" on the "swiperOptions", ' + 'use the "loop" prop on the Swiper component directly.');
        }
      }

      this._swiper = new _SwiperLib2.default(this._container, _extends(opts, swiperOptions));

      this._swiper.on('slideChange', function () {
        _this2._activeIndex = _this2._swiper.activeIndex;
        var activeSlide = _this2._getSlideChildren()[_this2._swiper.activeIndex];
        if (activeSlide && activeSlide.props.onActive) {
          activeSlide.props.onActive(_this2._swiper);
        }
      });

      if (this._activeIndex) {
        var index = Math.min(this._activeIndex, this._getSlideChildren().length - 1);
        this._swiper.slideTo(index, 0, false);
      }

      this._delegateSwiperEvents();
      this._createDuplicates();
      this.setState({ swiper: this._swiper });
      onInitSwiper(this._swiper);
    }

    /**
     * Delegates all swiper events to event handlers passed in props.
     * @private
     */

  }, {
    key: '_delegateSwiperEvents',
    value: function _delegateSwiperEvents() {
      var _this3 = this;

      _swiperEvents.events.forEach(function (event) {
        _this3._swiper.on(event, function () {
          if (this.props[event] && typeof this.props[event] === 'function') {
            this.props[event].apply(null, arguments);
          }
        }.bind(_this3));
      });
    }

    /**
     * Filter out non-Slide children.
     * @private
     * @param {?Array<Element>} Children Child elements, if omitted uses own children.
     * @return {Array}
     */

  }, {
    key: '_getSlideChildren',
    value: function _getSlideChildren(children) {
      children = children || this.props.children;
      return _react.Children.toArray(children).filter(function (child) {
        return child.type && child.type._isReactDynamicSwiperSlide;
      });
    }

    /**
     * Render an optional element. If predicate is false returns `null`, if true
     * renders a cloned `node` (if truthy), or a `div` with the given `className`.
     * @private
     * @param  {Boolean}  predicate Should render?
     * @param  {String}   className Classname for `div`
     * @param  {Function} refFn     Function for `ref` of cloned `node` or `div`
     * @param  {Element|Function}  node      Optional element. If `node` is a
     *                                       function, `swiper` instance will be
     *                                       passed as an argument.
     * @return {Element}
     */

  }, {
    key: '_renderOptional',
    value: function _renderOptional(predicate, className, refFn, node) {
      if (!predicate) return null;
      if (node) {
        var _node = typeof node === 'function' ? node(this.state.swiper) : node;
        return _react2.default.cloneElement(_node, { ref: refFn });
      }
      return _react2.default.createElement('div', { className: className, ref: refFn });
    }

    /**
     * Determines whether `swiper` should be re-initialized, or not, based on
     * `prevProps`.
     * @private
     * @param  {Object} prevProps Previous props.
     * @return {Boolean}
     */

  }, {
    key: '_shouldReInitialize',
    value: function _shouldReInitialize(prevProps) {
      return !(0, _deepEqual2.default)(prevProps.swiperOptions, this.props.swiperOptions) || prevProps.navigation !== this.props.navigation || prevProps.nextButton !== this.props.nextButton || prevProps.prevButton !== this.props.prevButton || prevProps.pagination !== this.props.pagination || prevProps.scrollBar !== this.props.scrollBar || prevProps.loop !== this.props.loop;
    }

    /**
     * Get props
     * @param {Object} props Props to filter
     * @return {Object}
     */

  }, {
    key: '_getNormProps',
    value: function _getNormProps(props) {
      return (0, _lodash2.default)(props, _swiperEvents.events.concat(['containerClassName', 'wrapperClassName', 'swiperOptions', 'navigation', 'prevButton', 'nextButton', 'pagination', 'paginationClickable', 'scrollBar', 'onInitSwiper']));
    }
  }, {
    key: '_reInit',
    value: function _reInit() {
      this._swiper.destroy(true, true);
      this._initSwiper();
    }
  }, {
    key: '_renderDuplicates',
    value: function _renderDuplicates() {
      var slides = this._getSlideChildren();
      return this.state.duplicates.map(function (portal) {
        return (0, _reactDom.createPortal)((0, _react.cloneElement)(slides[portal.index], {
          isPortaled: true
        }), portal.container);
      });
    }
  }, {
    key: '_createDuplicates',
    value: function _createDuplicates() {
      if (this.props.loop) {
        // @see: https://github.com/nolimits4web/swiper/blob/master/src/components/core/loop/loopCreate.js
        var slideDuplicateClass = this._swiper.params.slideDuplicateClass;


        var duplicates = [].slice.call(this._container.querySelectorAll('.' + slideDuplicateClass)).map(function (dupe) {
          // NOTE: When iDangerous-Swiper creates the duplicates it deeply clones
          // the nodes. Thus, before rendering the portals we must clear the
          // content. Dirty, but I do not see another possible way.
          dupe.innerHTML = '';

          return {
            container: dupe,
            // @see: https://github.com/nolimits4web/swiper/blob/master/src/components/core/loop/loopCreate.js#L37
            index: parseInt(dupe.getAttribute('data-swiper-slide-index'), 10)
          };
        });

        this.setState({ duplicates: duplicates });
      }
    }

    /**
     * Access internal Swiper instance.
     * @return {Swiper}
     */

  }, {
    key: 'swiper',
    value: function swiper() {
      return this._swiper;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._initSwiper();
      this._slidesCount = this._getSlideChildren().length;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._swiper.destroy();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var shouldReInitialize = this._shouldReInitialize(prevProps);
      var nextSlidesCount = this._getSlideChildren().length;
      var oldSlidesCount = this._slidesCount;

      this._slidesCount = nextSlidesCount;

      if (shouldReInitialize) {
        // NOTE: When in loop mode, the slide indexes are actually different. The
        // 0th index is actually the first duplicate, thus it is essentially like
        // a 1-based index mode (the old 0th is the 1st, so on and so forth). Thus,
        // to account for this upon re-initialization, increment the current
        // `_activeIndex` if going into a loop mode, and decrement if going out
        // of a loop mode.
        if (prevProps.loop !== this.props.loop) {
          this._activeIndex += this.props.loop ? 1 : -1;
        }
        return this._reInit();
      }

      if (nextSlidesCount !== oldSlidesCount) {
        // NOTE: `swiper.update()` doesn't seem to work when updating slides in
        // loop mode. If so, is this a bug in iDangerous Swiper, or is this our
        // only option?
        if (this.props.loop) {
          return this._reInit();
        }

        var index = Math.min(this._swiper.activeIndex, nextSlidesCount - 1);
        this._swiper.update();
        this._slidesCount = nextSlidesCount;
        this._swiper.slideTo(index, 0, false);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props2 = this.props,
          pagination = _props2.pagination,
          navigation = _props2.navigation,
          prevButton = _props2.prevButton,
          nextButton = _props2.nextButton,
          scrollBar = _props2.scrollBar,
          wrapperClassName = _props2.wrapperClassName,
          containerClassName = _props2.containerClassName,
          rest = _objectWithoutProperties(_props2, ['pagination', 'navigation', 'prevButton', 'nextButton', 'scrollBar', 'wrapperClassName', 'containerClassName']);

      return _react2.default.createElement(
        'div',
        this._getNormProps(rest),
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('swiper-container', containerClassName),
            ref: function ref(node) {
              _this4._container = node;
            }
          },
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)('swiper-wrapper', wrapperClassName) },
            this._getSlideChildren()
          ),
          this._renderOptional(pagination, 'swiper-pagination', function (node) {
            _this4._pagination = node;
          }, typeof pagination === 'boolean' ? false : pagination),
          this._renderOptional(navigation, 'swiper-button-prev', function (node) {
            _this4._prevButton = node;
          }, prevButton),
          this._renderOptional(navigation, 'swiper-button-next', function (node) {
            _this4._nextButton = node;
          }, nextButton),
          this._renderOptional(scrollBar, 'swiper-scrollbar', function (node) {
            _this4._scrollBar = node;
          }, typeof scrollBar === 'boolean' ? false : scrollBar),
          this._renderDuplicates()
        )
      );
    }
  }]);

  return Swiper;
}(_react.Component);

Swiper.propTypes = _extends({
  containerClassName: _propTypes2.default.string,
  wrapperClassName: _propTypes2.default.string,
  swiperOptions: _propTypes2.default.object,
  navigation: _propTypes2.default.bool,
  prevButton: FuncElementType,
  nextButton: FuncElementType,
  pagination: BoolOrFuncElementType,
  paginationClickable: _propTypes2.default.bool,
  scrollBar: BoolOrFuncElementType,
  loop: _propTypes2.default.bool,
  onInitSwiper: _propTypes2.default.func
}, _swiperEvents.EventPropTypes);
Swiper.defaultProps = {
  swiperOptions: {},
  navigation: true,
  pagination: true,
  paginationClickable: false,
  scrollBar: false,
  loop: false,
  onInitSwiper: function onInitSwiper() {}
};
exports.default = Swiper;
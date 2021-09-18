function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StyleKeeper =
/*#__PURE__*/
function () {
  function StyleKeeper(userAgent) {
    _classCallCheck(this, StyleKeeper);

    this._userAgent = void 0;
    this._listeners = void 0;
    this._cssSet = void 0;
    this._userAgent = userAgent;
    this._listeners = [];
    this._cssSet = {};
  }

  _createClass(StyleKeeper, [{
    key: "subscribe",
    value: function subscribe(listener) {
      var _this = this;

      if (this._listeners.indexOf(listener) === -1) {
        this._listeners.push(listener);
      }

      return {
        // Must be fat arrow to capture `this`
        remove: function remove() {
          var listenerIndex = _this._listeners.indexOf(listener);

          if (listenerIndex > -1) {
            _this._listeners.splice(listenerIndex, 1);
          }
        }
      };
    }
  }, {
    key: "addCSS",
    value: function addCSS(css) {
      var _this2 = this;

      if (!this._cssSet[css]) {
        this._cssSet[css] = true;

        this._emitChange();
      }

      return {
        // Must be fat arrow to capture `this`
        remove: function remove() {
          delete _this2._cssSet[css];

          _this2._emitChange();
        }
      };
    }
  }, {
    key: "getCSS",
    value: function getCSS() {
      return Object.keys(this._cssSet).join('\n');
    }
  }, {
    key: "_emitChange",
    value: function _emitChange() {
      this._listeners.forEach(function (listener) {
        return listener();
      });
    }
  }]);

  return StyleKeeper;
}();

export { StyleKeeper as default };
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useContext } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import StyleKeeper from './style-keeper';
export var StyleKeeperContext = React.createContext(undefined);
export var RadiumConfigContext = React.createContext(undefined);
export function withRadiumContexts(WrappedComponent) {
  var WithRadiumContexts = React.forwardRef(function (props, ref) {
    var radiumConfigContext = useContext(RadiumConfigContext);
    var styleKeeperContext = useContext(StyleKeeperContext);
    return React.createElement(WrappedComponent, _extends({
      ref: ref
    }, props, {
      radiumConfigContext: radiumConfigContext,
      styleKeeperContext: styleKeeperContext
    }));
  });
  WithRadiumContexts.displayName = "withRadiumContexts(".concat(WrappedComponent.displayName || WrappedComponent.name || 'Component', ")");
  return hoistStatics(WithRadiumContexts, WrappedComponent);
}
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useContext, useRef } from 'react';
import Enhancer from '../enhancer';
import StyleKeeper from '../style-keeper';
import StyleSheet from './style-sheet';
import { StyleKeeperContext, RadiumConfigContext } from '../context';

function getStyleKeeper(configProp, configContext) {
  var userAgent = configProp && configProp.userAgent || configContext && configContext.userAgent;
  return new StyleKeeper(userAgent);
}

var StyleRootInner = Enhancer(function (_ref) {
  var children = _ref.children,
      otherProps = _objectWithoutProperties(_ref, ["children"]);

  return React.createElement("div", otherProps, children, React.createElement(StyleSheet, null));
});

var StyleRoot = function StyleRoot(props) {
  /* eslint-disable no-unused-vars */
  // Pass down all props except config to the rendered div.

  /* eslint-enable no-unused-vars */
  var radiumConfig = props.radiumConfig;
  var configContext = useContext(RadiumConfigContext);
  var styleKeeper = useRef(getStyleKeeper(radiumConfig, configContext));
  return React.createElement(StyleKeeperContext.Provider, {
    value: styleKeeper.current
  }, React.createElement(StyleRootInner, props));
};

export default StyleRoot;
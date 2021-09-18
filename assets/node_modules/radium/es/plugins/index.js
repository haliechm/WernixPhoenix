/* eslint-disable block-scoped-const */
import checkPropsPlugin from './check-props-plugin';
import keyframesPlugin from './keyframes-plugin';
import mergeStyleArrayPlugin from './merge-style-array-plugin';
import prefixPlugin from './prefix-plugin';
import removeNestedStylesPlugin from './remove-nested-styles-plugin';
import resolveInteractionStylesPlugin from './resolve-interaction-styles-plugin';
import resolveMediaQueriesPlugin from './resolve-media-queries-plugin';
import visitedPlugin from './visited-plugin';
export default {
  checkProps: checkPropsPlugin,
  keyframes: keyframesPlugin,
  mergeStyleArray: mergeStyleArrayPlugin,
  prefix: prefixPlugin,
  removeNestedStyles: removeNestedStylesPlugin,
  resolveInteractionStyles: resolveInteractionStylesPlugin,
  resolveMediaQueries: resolveMediaQueriesPlugin,
  visited: visitedPlugin
};
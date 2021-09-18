import { getPrefixedStyle } from '../prefixer';
export default function prefixPlugin(_ref) {
  var config = _ref.config,
      style = _ref.style;
  var newStyle = getPrefixedStyle(style, config.userAgent);
  return {
    style: newStyle
  };
}
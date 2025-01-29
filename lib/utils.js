'use strict';

/**
 * Extract a substring from a hex string and parse it as an integer
 * @param {string} hash - Source hex string 
 * @param {number} index - Start index of substring
 * @param {number} [length] - Length of substring. Defaults to 1.
 */
function hexVal(hash, index, len) {
  return parseInt(hash.substr(index, len || 1), 16);
}

/**
 * Re-maps a number from one range to another
 * @param {number} value - Input value to be converted
 * @param {number} vMin - Lower bound of value's current range
 * @param {number} vMax - Upper bound of value's current range
 * @param {number} dMin - Lower bound of value's target range
 * @param {number} dMax - Upper bound of value's target range
 */
function map(value, vMin, vMax, dMin, dMax) {
  const vValue = parseFloat(value);
  const vRange = vMax - vMin;
  const dRange = dMax - dMin;
  return (vValue - vMin) * dRange / vRange + dMin;
}

/**
 * Determines fill color based on value
 * @param {number} val - Input value
 * @returns {string} Hex color string
 */
function fillColor(val) {
  return (val % 2 === 0) ? '#ddd' : '#222';
}

/**
 * Calculates fill opacity based on value
 * @param {number} val - Input value 
 * @returns {number} Opacity value between 0.02 and 0.15
 */
function fillOpacity(val) {
  return map(val, 0, 15, 0.02, 0.15);
}

// Constants
const STROKE_COLOR = '#000';
const STROKE_OPACITY = 0.02;
const FILL_COLOR_DARK = '#222';
const FILL_COLOR_LIGHT = '#ddd';
const OPACITY_MIN = 0.02;
const OPACITY_MAX = 0.15;

module.exports = {
  hexVal,
  map,
  fillColor,
  fillOpacity,
  STROKE_COLOR,
  STROKE_OPACITY,
  FILL_COLOR_DARK,
  FILL_COLOR_LIGHT,
  OPACITY_MIN,
  OPACITY_MAX
};

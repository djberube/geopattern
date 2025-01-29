'use strict';

const STROKE_COLOR = '#000';
const STROKE_OPACITY = 0.02;

function buildOctogonShape(squareSize) {
  const c = squareSize * 0.33;
  return [
    c, 0,
    squareSize - c, 0,
    squareSize, c,
    squareSize, squareSize - c,
    squareSize - c, squareSize,
    c, squareSize,
    0, squareSize - c,
    0, c,
    c, 0
  ].join(',');
}

module.exports = function generateOctogons(svg, hash) {
  const squareSize = map(hexVal(hash, 0), 0, 15, 10, 60);
  const tile = buildOctogonShape(squareSize);

  svg.setWidth(squareSize * 6);
  svg.setHeight(squareSize * 6);

  let i = 0;
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 6; x++) {
      const val = hexVal(hash, i);
      const opacity = fillOpacity(val);
      const fill = fillColor(val);

      svg.polyline(tile, {
        fill: fill,
        'fill-opacity': opacity,
        stroke: STROKE_COLOR,
        'stroke-opacity': STROKE_OPACITY
      }).transform({
        translate: [
          x * squareSize,
          y * squareSize
        ]
      });

      i += 1;
    }
  }
};

function hexVal(hash, index, len) {
  return parseInt(hash.substr(index, len || 1), 16);
}

function map(value, vMin, vMax, dMin, dMax) {
  const vValue = parseFloat(value);
  const vRange = vMax - vMin;
  const dRange = dMax - dMin;
  return (vValue - vMin) * dRange / vRange + dMin;
}

function fillColor(val) {
  return (val % 2 === 0) ? '#ddd' : '#222';
}

function fillOpacity(val) {
  return map(val, 0, 15, 0.02, 0.15);
}

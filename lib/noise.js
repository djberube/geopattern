
/**
 * Generates 2D Perlin noise
 */
function Perlin2D() {
  this.permutation = new Array(256);
  this.p = new Array(512);
  
  // Initialize permutation array with random values
  for (let i = 0; i < 256; i++) {
    this.permutation[i] = Math.floor(Math.random() * 256);
  }
  
  // Extend permutation array to avoid overflow
  for (let i = 0; i < 512; i++) {
    this.p[i] = this.permutation[i & 255];
  }
}

/**
 * Get noise value at coordinates
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate 
 * @returns {number} Noise value between -1 and 1
 */
Perlin2D.prototype.noise = function(x, y) {
  // Find unit square containing point
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  
  // Get relative x,y of point in square
  x -= Math.floor(x);
  y -= Math.floor(y);
  
  // Compute fade curves
  const u = fade(x);
  const v = fade(y);
  
  // Hash coordinates of cube corners
  const A = this.p[X] + Y;
  const AA = this.p[A];
  const AB = this.p[A + 1];
  const B = this.p[X + 1] + Y;
  const BA = this.p[B];
  const BB = this.p[B + 1];
  
  // Add blended results from corners
  return lerp(v, lerp(u, grad(this.p[AA], x, y), 
                        grad(this.p[BA], x-1, y)),
                 lerp(u, grad(this.p[AB], x, y-1),
                        grad(this.p[BB], x-1, y-1)));
};

/**
 * Fade function for smoother interpolation
 * @param {number} t Value to fade
 * @returns {number} Faded value
 */
function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/**
 * Linear interpolation
 */
function lerp(t, a, b) {
  return a + t * (b - a);
}

/**
 * Gradient function
 */
function grad(hash, x, y) {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

/**
 * Generates sine wave distortion
 * @param {number} x - X coordinate
 * @param {number} amplitude - Wave amplitude
 * @param {number} frequency - Wave frequency
 * @param {number} phase - Wave phase shift
 * @returns {number} Distorted y value
 */
function sineWave(x, amplitude, frequency, phase) {
  return amplitude * Math.sin(frequency * x + phase);
}

/**
 * Applies distortion to a value
 * @param {number} value - Input value
 * @param {object} options - Distortion options
 * @returns {number} Distorted value
 */
function distort(value, options) {
  const opts = Object.assign({
    amplitude: 1,
    frequency: 1,
    phase: 0,
    perlin: false
  }, options);

  let distortion = 0;
  
  if (opts.perlin) {
    const perlin = new Perlin2D();
    distortion += perlin.noise(value * opts.frequency, 0) * opts.amplitude;
  }
  
  distortion += sineWave(value, opts.amplitude, opts.frequency, opts.phase);
  
  return value + distortion;
}

module.exports = {
  Perlin2D,
  sineWave, 
  distort
};

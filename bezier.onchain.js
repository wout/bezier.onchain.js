/**
 * @typedef {[number, number]} Point - Typically [x, y]
 */

export const Bez = {
  /**
  * Converts an array of points into a path data string for an SVG <path> node.
  * 
  * @param {Point[]} ps - Points array. 
  * @param {boolean|null} c - Close the curve by setting to true.
  * @param {number} s - Smoothing of curve (defaults to 0.2).
  * @param {number} d - Decimal places for rounding of points (defaults to 2).
  * @returns {string} Path data for an SVG path.
  */
  ier: (ps, c, s = 0.2, d = 2) => ps.reduce((b, p, i) => !i ? 'M' + Bez.r(p, d) :
    b + Bez.bp(ps, i, s, d), '') + (c ? 'z' : ''),

  /**
   * Builds a point with its control points on both sides.
   * 
   * @param {Point[]} ps - Points array.
   * @param {number} i - Index of current iteration.
   * @param {number} s - Smoothing of curve.
   * @param {number} d - Decimal places for rounding of points.
   * @returns {string}
   */
  bp: (ps, i, s, d) => 'C' + Bez.r(Bez.cp(ps[i - 1], ps[i - 2], ps[i], s, d), d)
    + ' ' + Bez.r(Bez.cp(ps[i], ps[i - 1], ps[i + 1], s, d, true), d)
    + ' ' + Bez.r(ps[i], d),

  /**
   * Calculates and builds a control point.
   * 
   * @param {Point} c - Current point.
   * @param {Point|null} p - Previous point.
   * @param {Point|null} n - Next point.
   * @param {number} s - Smoothing of curve.
   * @param {number} d - Decimal places for rounding of points.
   * @param {boolean|null} r - Reverse direction of control point.
   * @returns {Point} Control point for one side of the current point.
   */
  cp: (c, p, n, s, d, r) => Bez.bc(
    c, ...Bez.lp((n = n || c)[0] - (p = p || c)[0], n[1] - p[1], s), r ? Math.PI : 0, d
  ),

  /**
   * Builds the control point.
   *
   * @param {Point} c - Current point.
   * @param {number} l - Length of control handle.
   * @param {number} a - Angle of control handle.
   * @param {number} o - Offset for reversed control handle.
   * @param {number} d - Decimal places for rounding of points.
   * @returns {Point} Control point for one side of the current point.
   */
  bc: (c, l, a, o, d) => Bez.r([c[0] + Math.cos(a + o) * l, c[1] + Math.sin(a + o) * l], d),

  /**
   * Calculates line properties.
   * 
   * @param {number} x - X-position of control point.
   * @param {number} y - Y-position of control point.
   * @param {number} s - Smoothing of curve.
   * @returns {[number, number]} Length and angle of the control handle.
   */
  lp: (x, y, s) => [Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) * s, Math.atan2(y, x)],

  /**
   * Rounds a point ([x, y]) to a given number of decimals.
   * 
   * @param {Point} p - Single point.
   * @param {number} d - Decimals places.
   * @returns {Point} Rounded point.
   */
  r: (p, d) => p.map(n => Math.round(n * (10 ** d)) / (10 ** d))
}

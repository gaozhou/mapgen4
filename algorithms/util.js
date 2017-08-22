// From http://www.redblobgames.com/maps/mapgen2/
// Copyright 2017 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>

/** Return value, unless it's undefined, then return orElse */
exports.fallback = function(value, orElse) {
    return (value !== undefined)? value : orElse;
};

/** Add several noise values together */
exports.fbm_noise = function(noise, nx, ny) {
    return 0.5 * noise.noise2D(nx, ny, 0)
        + 0.3 * noise.noise2D(nx * 2, ny * 2, 1)
        + 0.2 * noise.noise2D(nx * 4, ny * 4, 2)
        + 0.1 * noise.noise2D(nx * 8, ny * 8, 3);
};

/** Like GLSL. Return t clamped to the range [lo,hi] inclusive */
exports.clamp = function(t, lo, hi) {
    if (t < lo) { return lo; }
    if (t > hi) { return hi; }
    return t;
};

/** Like GLSL. Return a mix of a and b; all a when is 0 and all b when
 * t is 1; extrapolates when t outside the range [0,1] */
exports.mix = function(a, b, t) {
    return a * (1.0-t) + b * t;
};

/** Like GLSL. */
exports.smoothstep = function(a, b, t) {
    // https://en.wikipedia.org/wiki/Smoothstep
    if (t <= a) { return 0; }
    if (t >= b) { return 1; }
    t = (t - a) / (b - a);
    return (3 - 2*t) * t * t;
};

/** Circumcenter of a triangle with vertices a,b,c */
exports.circumcenter = function(a, b, c) {
    // https://en.wikipedia.org/wiki/Circumscribed_circle#Circumcenter_coordinates
    let ad = a[0]*a[0] + a[1]*a[1],
        bd = b[0]*b[0] + b[1]*b[1],
        cd = c[0]*c[0] + c[1]*c[1];
    let D = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
    let Ux = 1/D * (ad * (b[1] - c[1]) + bd * (c[1] - a[1]) + cd * (a[1] - b[1]));
    let Uy = 1/D * (ad * (c[0] - b[0]) + bd * (a[0] - c[0]) + cd * (b[0] - a[0]));
    return [Ux, Uy];
};

/**
 * in-place shuffle of an array - Fisher-Yates
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
 */
exports.randomShuffle = function(array, randInt) {
    for (let i = array.length-1; i > 0; i--) {
        let j = randInt(i+1);
        let swap = array[i];
        array[i] = array[j];
        array[j] = swap;
    }
    return array;
};

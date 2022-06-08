# bezier.onchain.js

A micro JS library (491 bytes) for building SVG bezier paths from an arrays of
points.

This library is intended for use in environments where the available storage
space is very limited; like blockchains for example. Everything is stripped down
to the bare essentials.

![GitHub](https://img.shields.io/github/license/onchainjs/bezier.onchain.js)
![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/onchainjs/bezier.onchain.js)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/onchainjs/bezier.onchain.js/bezier.onchain.js%20CI)

## Usage
Pass an array of points to the build method:

```js
const ps = [
  [20, 30],
  [40, 10],
  [80, 60],
  [100, 35],
  [140, 85],
  [160, 60]
]

Bez.ier(ps)
// => "M20,30C24,26 28,4 40,10C52,16 68,55 80,60C92,65 88,30 100,35C112,..."
```

![SVG path with default settings](/examples/default.svg)

### Closing the path
The second argument takes a boolean value to close the curve:

```js
Bez.ier(ps, true)
```

![Closed SVG path](/examples/default-closed.svg)

### Adjust smoothing
The default smoothing is `0.2`, but a different value can be passed as the third
argument.

#### Smoothing of 0.5
```js
Bez.ier(ps, false, 0.5)
```
![Smoothing of 0.5](/examples/smoothing-05.svg)

#### Smoothing of 1.0
```js
Bez.ier(ps, false, 1)
```
![Smoothing of 1.0](/examples/smoothing-10.svg)

#### Smoothing of 0
```js
Bez.ier(ps, false, 0)
```
![Smoothing of 0](/examples/smoothing-00.svg)

### Maximum decimal places for points
Path data strings can often become quite large if no rounding happens on the
points. With many elements on the canvas, this will lead to degraded browser
performance. But saving the document will also result in unnecessarily heavy
files.

Here's an example of an unrounded path string:

```js
"M0,0C0.6283185307179587,0.31415926535897937 1.8849555921538756,0.9424777960769378 3.1415926535897936,1.5707963267948968C4.39822971502571,2.199114857512855 5.654866776461628,2.827433388230814 6.283185307179587,3.141592653589793"
```

This library will round points at two decimals places by default, so the same
path string becomes a lot smaller without loosing visible precision:

```js
"M0,0C0.63,0.31 1.88,0.94 3.14,1.57C4.4,2.2 5.65,2.83 6.28,3.14"
```

But this value can be tweaked by passing an integer value to the fourth argument
of the `build()` method:

```js
Bez.ier(ps, false, 0.2, 1)
// => "M0,0C0.6,0.3 1.9,0.9 3.1,1.6C4.4,2.2 5.7,2.8 6.3,3.1"
Bez.ier(ps, false, 0.2, 3)
// => "M0,0C0.628,0.314 1.885,0.942 3.142,1.571C4.398,2.199 5.655,2.827 6.283,3.142"
```

## License
bezier.onchain.js is licensed under the terms of the MIT License.




# bezier.onchain.js

A micro JS library (521 bytes) for building SVG bezier paths from an arrays of
points.

This library is intended for use in environments where the available storage
space is very limited; like blockchains for example. Everything is stripped down
to the bare essentials.

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

Bez.build(ps)
// => M20,30 C24,26 28,4 40,10 C52,16 68,55 80,60 C92,65 88,30 100,35 C112,40...
```

Which will produce a curve like the following:

![SVG path with default settings](/examples/default.svg)
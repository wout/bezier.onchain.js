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

<svg xmlns="http://www.w3.org/2000/svg" width="180" version="1.1" height="95"><circle fill="#999" cy="30" cx="20" r="2"></circle><circle fill="#999" cy="10" cx="40" r="2"></circle><circle fill="#999" cy="60" cx="80" r="2"></circle><circle fill="#999" cy="35" cx="100" r="2"></circle><circle fill="#999" cy="85" cx="140" r="2"></circle><circle fill="#999" cy="60" cx="160" r="2"></circle><polyline stroke="#ccc" fill="none" points="20,30 40,10 80,60 100,35 140,85 160,60"></polyline><path fill="none" stroke="#f03" d="M20,30 C24,26 28,4 40,10 C52,16 68,55 80,60 C92,65 88,30 100,35 C112,40 128,80 140,85 C152,90 156,65 160,60"></path></svg>
import {Bez} from '../bezier.onchain.js'

describe('Bez', () => {
  const ps = [
    [200, 300],
    [400, 50],
    [800, 550],
    [1000, 300]
  ]


  describe('.build', () => {
    it('builds a path data string from an array of points', () => {
      expect(Bez.build(ps))
        .toBe('M200,300 C240,250 280,0 400,50 C520,100 680,500 800,550 C920,600 960,350 1000,300')
    })

    it('optionally closes a path', () => {
      expect(Bez.build(ps, true).slice(-1)).toBe('z')
    })

    it('accepts a different smoothing', () => {
      expect(Bez.build(ps, false, 0.5))
        .toBe('M200,300 C300,175 100,-75 400,50 C700,175 500,425 800,550 C1100,675 900,425 1000,300')
    })

    it('accepts a different rounding value for the number of decimal places', () => {
      const pips = [...Array(3)].map((_, i) => [i * Math.PI, i * Math.PI / 2])

      expect(Bez.build(pips, false, 0.2, 3))
        .toBe('M0,0 C0.628,0.314 1.885,0.942 3.142,1.571 C4.398,2.199 5.655,2.827 6.283,3.142')
    })
  })
})
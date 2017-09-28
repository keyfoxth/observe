import Observe from './observe'
import callback from './callback'

const obj = {
  a: 'str_a',
  b: 1,
  c: [2, 3, 4],
  d: {
    e: {
      f: 'str_f'
    }
  }
}

new Observe(obj, callback)

obj.a = {
  new: 'new_a'
}
obj.a.new = 'new_b'
obj.b = 11
obj.c = [1, 2, 3, 4]
obj.c.push(5)
obj.d.e.f = 'gg'

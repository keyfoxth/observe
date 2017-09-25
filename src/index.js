import Observe from './observe'

function isObject (v) {
  const type = typeof v
  return !!v && type === 'object' || type === 'function'
}

const callback = (newVal, oldVal, path) => {
  newVal = isObject(newVal) ? JSON.stringify(newVal) : newVal
  console.log('newVal: ' + newVal)
  console.log('oldVal: ' + oldVal)
  console.log('path: ' + path + '\n---')
}

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

obj.a = { new: 'new_a' }
obj.a.new = 'new_b'
obj.b = 11
obj.c = [1, 2, 3, 4]
obj.c.push(5)
obj.d.e.f = 'gg'

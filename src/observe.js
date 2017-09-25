function isObject (v) {
  const type = typeof v
  return !!v && type === 'object' || type === 'function'
}

function isArray (v) {
  return Array.isArray(v)
}

class Observe {
  constructor (obj, callback) {
    if (!isObject(obj)) {
      throw Error('not a object')
    }

    this.$callback = callback
    this.observe(obj)
  }

  observe (obj, path) {
    if (isArray(obj)) {
      this.createFakeArrayProto(obj, path)
    }

    for (const key in obj) {
      let oldVal = obj[key]
      let pathArray = path && path.slice()

      if (pathArray) {
        pathArray.push(key)
      } else {
        pathArray = [key]
      }

      Object.defineProperty(obj, key, {
        get: () => {
          return oldVal
        },
        set: (newVal) => {
          if (newVal !== oldVal) {
            if (isObject(newVal)) {
              this.observe(newVal, pathArray)
            }

            this.$callback(newVal, oldVal, pathArray)
            oldVal = newVal
          }
        }
      })

      if (isObject(oldVal)) {
        this.observe(oldVal, pathArray)
      }
    }
  }

  createFakeArrayProto (arr, path) {
    const arrayProto = Array.prototype
    const fakeArrayProto = Object.create(arrayProto)
    const arrayMethod = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
    const self = this

    for (const method of arrayMethod) {
      Object.defineProperty(fakeArrayProto, method, {
        value: function (...arg) {
          const oldArray = this.slice()
          const result = arrayProto[method].apply(this, arg)

          self.observe(this, path)
          self.$callback(this, oldArray, path)
          return result
        }
      })
    }

    Object.setPrototypeOf(arr, fakeArrayProto)
  }
}

export default Observe

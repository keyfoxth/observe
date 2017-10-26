import { isObject, isArray } from 'judgment'

class Observe {
  constructor (obj, callback) {
    if (!isObject(obj)) {
      throw Error('not a object')
    }

    this.$callback = callback
    this.observeAll(obj)
  }

  observeAll (obj, path) {
    if (isArray(obj)) {
      this.observeArray(obj, path)
    }

    this.observeObject(obj, path)
  }

  observeObject (obj, path) {
    for (const key in obj) {
      let pathArray = path && path.slice()
      if (pathArray) {
        pathArray.push(key)
      } else {
        pathArray = [key]
      }

      let oldVal = obj[key]
      Object.defineProperty(obj, key, {
        get: () => {
          return oldVal
        },
        set: (newVal) => {
          if (newVal !== oldVal) {
            if (isObject(newVal)) {
              this.observeAll(newVal, pathArray)
            }

            this.$callback(newVal, oldVal, pathArray)
            oldVal = newVal
          }
        }
      })

      if (isObject(oldVal)) {
        this.observeAll(oldVal, pathArray)
      }
    }
  }

  observeArray (arr, path) {
    const arrayProto = Array.prototype
    const fakeArrayProto = Object.create(arrayProto)
    const arrayMethod = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
    const self = this

    for (const method of arrayMethod) {
      Object.defineProperty(fakeArrayProto, method, {
        value: function (...arg) {
          const oldArray = this.slice()
          const result = arrayProto[method].apply(this, arg)

          self.observeAll(this, path)
          self.$callback(this, oldArray, path)
          return result
        }
      })
    }

    Object.setPrototypeOf(arr, fakeArrayProto)
  }
}

export default Observe

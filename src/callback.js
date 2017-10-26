import { isObject } from 'judgment'

const callback = (newVal, oldVal, path) => {
  newVal = isObject(newVal) ? JSON.stringify(newVal) : newVal
  console.log('newVal: ' + newVal)
  console.log('oldVal: ' + oldVal)
  console.log('path: ' + path + '\n---')
}

export default callback

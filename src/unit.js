export function isObject (v) {
  const type = typeof v
  return !!v && type === 'object' || type === 'function'
}

export function isArray (v) {
  return Array.isArray(v)
}

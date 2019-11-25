function init(api) {
  return new Proxy(api, {
    get(target, name) {
      if (name in target) {
        return target[name].get()
      }
    },
    set(obj, prop, ...values) {
      obj[prop].set(values)
    },
  })
}

module.exports = init

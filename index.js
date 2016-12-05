function promisifyF (fn) {
  return function promisified () {
    var args = arguments
    return new Promise(function (resolve, reject) {
      fn.apply(undefined, args).fork(reject, resolve)
    })
  }
}

module.exports = promisifyF

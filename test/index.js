const test = require('tape')
const {Future} = require('ramda-fantasy')
const promisify = require('../')

const wait = (fail) => new Future((reject, resolve) => {
  setTimeout(fail ? reject : resolve, 50)
})

test('returns a promise', t => {
  t.plan(1)
  t.equal(typeof promisify(wait)().then, 'function')
})

test('calls then() on resolve', t => {
  t.plan(1)
  promisify(wait)().then(t.pass, t.fail)
})

test('calls catch() on reject', t => {
  t.plan(1)
  promisify(wait)(true)
    .then(t.fail)
    .catch(t.pass)
})

test('fn is executed when called', t => {
  t.plan(2)
  let called = false
  const fn = () => new Future((reject, resolve) => {
    called = true
    resolve()
  })
  const pfn = promisify(fn)
  t.false(called)
  pfn()
  t.true(called)
})

test('future reject err is passed to promise reject', t => {
  t.plan(1)
  const fn = () => new Future((reject, resolve) => {
    reject('nope')
  })
  promisify(fn)().then(t.fail).catch(err => t.equal(err, 'nope'))
})

test('future resolve value is passed to promise resolve', t => {
  t.plan(1)
  const fn = () => new Future((reject, resolve) => {
    resolve('yep')
  })
  promisify(fn)().then(v => t.equal(v, 'yep')).catch(t.fail)
})

test('args are passed through', t => {
  t.plan(1)
  const fn = (...args) => new Future((reject, resolve) => {
    t.deepEqual(args, ['d', 'e', 'f'])
    resolve()
  })
  promisify(fn)('d', 'e', 'f')
})

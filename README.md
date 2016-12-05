# promisify-f

Turns a function that returns a future into a function that returns a promise.

## install

```sh
npm install promisify-f
```

## example

```js
const promisify = require('promisify-f')

const futureIncrement = (ms, n) => new Future((reject, resolve) => {
  setTimeout(() => {
    resolve(n + 1)
  }, ms)
})

const incrementAsync = promisify(futureIncrement)
incrementAsync(500, 7).then(console.log) //=> 8
```

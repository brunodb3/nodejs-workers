/**
 *  simple-worker.js
 *    - this is the simple-worker module
 *
 **************************************************************************************************/

// global imports - here we import the js-md5 module
// https://www.npmjs.com/package/js-md5
const md5 = require('js-md5')

// do some work
function doWork(input, done) {
  // to simulate a load, we hash a string using md5
  const hashed = md5(input.toHash);

  // calling the callback
  done({ worker: input.work, hashed: hashed })
}

// exporting as a module (using CommonJS format)
module.exports = doWork

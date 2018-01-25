/**
 *  index.js
 *    - this is the main entry file for the application
 *
 **************************************************************************************************/

// global imports - here we import the threads module
// https://www.npmjs.com/package/threads
const threads = require('threads');
const Pool = require('threads').Pool;

// getting spawn and config
const spawn = threads.spawn;
const config = threads.config;

// configuring threads module
config
  .set({
    basepath: {
      node: './src/workers',
    }
  })

// creating a pool
const pool = new Pool();

// simulating an X number of workers
for (let index = 0; index < 10; index++) {
  // running a worker on the pool
  const simpleWork = pool
    .run('simple-worker.js')
    .send({ work: `worker ${index}`, toHash: `this is a string to be hashed ${index}` })
}

// listening for pool events
pool
  .on('done', function (job, output) {
    // a worker has done it's job
    console.log(`${output.worker} > "${output.hashed}"`)
  })
  .on('error', function (job, error) {
    // a worker has errored it's job
    console.error(error)
  })
  .on('finished', function () {
    // all workers are now idle, no more jobs to run
    console.log('\n everything finished \n')

    // killing the pool
    pool.killAll()
  })
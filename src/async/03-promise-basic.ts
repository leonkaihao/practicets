// test resolve
function testPromise1() {
  new Promise((resolve) => {
    setTimeout(resolve, 2000);
  }).then(() => {
    console.log("testPromise1: resolved");
  });
}
testPromise1();

// test reject
function testPromise2() {
  new Promise((resolve, reject) => {
    setTimeout(reject, 2000);
  })
    .then(() => {
      console.log("testPromise2: resolved");
    })
    .catch(() => {
      console.error("testPromise2: rejected");
    });
}
testPromise2();

// another reject test
// we do not wrap setTimeOut but set setTimeout wrap a Promise
function testPromise3() {
  let promise: Promise<any>;
  setTimeout(() => {
    promise = Promise.reject("paaaa");

    promise
      .then(() => {
        console.log("testPromise3: resolved");
      })
      .catch(() => {
        console.error("testPromise3: rejected");
      });
  }, 2000);
}
testPromise3();

// test reolve and reject chain
// next step will be called when current step is fullfilled.
function testPromise4() {
  let promise: Promise<any>;
  promise = Promise.resolve("done")
    .then((data) => {
      console.log(`testPromise4: resolved 1: ${data}`);
      return data; // returned data will be carried to the next resolve stage by a new Promise.
    })
    .then((data) => {
      throw `testPromise4: rejected: ${data}`;
    })
    .catch((err) => {
      throw `${err} 1`;
    })
    .then((data) => {
      // to be ignored
      console.log(`testPromise4: resolved 2: ${data}`);
    })
    .catch((err) => {
      throw `${err} 2`;
    })
    .catch((err) => {
      throw `${err} 3`;
    })
    .catch((err) => {
      console.error(err);
    });
}
testPromise4();

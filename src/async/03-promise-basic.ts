// test resolve
function example1() {
  new Promise((resolve) => {
    setTimeout(resolve, 2000);
  }).then(() => {
    console.log("example1: resolved");
  });
}
example1();

// test reject
function example2() {
  new Promise((resolve, reject) => {
    setTimeout(reject, 2000);
  })
    .then(() => {
      console.log("example2: resolved");
    })
    .catch(() => {
      console.error("example2: rejected");
    });
}
example2();

// another reject test
// we do not wrap setTimeOut but
function example3() {
  let promise: Promise<any>;
  setTimeout(() => {
    promise = Promise.reject("paaaa");

    promise
      .then(() => {
        console.log("example3: resolved");
      })
      .catch(() => {
        console.error("example3: rejected");
      });
  }, 2000);
}
example3();

// test reolve and reject chain
// next step will be called when current step is fullfilled.
function example4() {
  let promise: Promise<any>;
  promise = Promise.resolve("done")
    .then((data) => {
      console.log(`example4: resolved 1: ${data}`);
      return data;
    })
    .then((data) => {
      throw `example4: rejected: ${data}`;
    })
    .catch((err) => {
      throw `${err} 1`;
    })
    .then((data) => {
      // to be ignored
      console.log(`example4: resolved 2: ${data}`);
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
example4();

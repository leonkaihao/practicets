// example1: a simplest approach to generator.
function* foo() {
  for (let i = 0; i < 10; i++) {
    yield i;
  }
}

function testYield1() {
  const generator = foo();
  // next() make the generator fucntion run until reaching the position of yield.
  // yield return the value and stop.
  console.log(generator.next().value);
  console.log(generator.next().value);
}
testYield1();

// example2: see how yield splits a process
function doSthFirst(val: number) {
  console.log(`deal with ${val} first`);
}
function doSthSecond(val: number) {
  console.log(`deal with ${val} second`);
}
function* foo2() {
  for (let i = 0; i < 10; i++) {
    doSthFirst(i);
    yield i;
    doSthSecond(i);
  }
}
function testYield2() {
  const generator = foo2();
  generator.next();
  generator.next();
}
testYield2();

// example3: yield promise
function foo3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("done");
    }, 2000);
  });
}

function* testYield3() {
  const val = yield foo3();
  return val;
}
console.log(`testYield3: ${testYield3().next().value}`);

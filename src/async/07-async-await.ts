// example1: find out how 2 async functions work together.

import { async } from "rxjs";

// this function does not stop.
async function foo1(str: string) {
  for (let i = 0; i < 1000; i++) {
    process.stdout.write(str);
  }
}
function bar1() {
  foo1(".");
  foo1("X");
  foo1("_");
}
// bar1();

// example2: await in async.
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function foo2(str: string, ms: number) {
  for (let i = 0; i < 1000; i++) {
    await delay(ms);
    process.stdout.write(str);
  }
}
function bar2() {
  foo2(".", 50);
  foo2("X", 100);
  foo2("_", 200);
}
// bar2();

// example3: return a Promise or a value
async function foo3(): Promise<string> {
  await delay(2000);
  return "foo3: done"; // return a value
}
function bar3() {
  const p = foo3();
  p.then((val) => {
    console.log(val);
  });
}
bar3();

async function foo4(): Promise<string> {
  await delay(2000);
  return new Promise<string>((resolve) => {
    resolve("foo4: done");
  });
}

async function bar4() {
  const val = await foo4();
  console.log(val);
}
bar4();

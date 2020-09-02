import { async } from "rxjs";

// example1: async return a promise
async function foo(): Promise<string> {
  return "hello";
}

async function bar() {
  const str = await foo();
  console.log(str);
}
bar();

// example2: equal to callback
async function bar2() {
  foo().then((str) => {
    console.log(str);
  });
}
bar2();

// example3: but callback cannot do this
async function validate(i: number) {
  return i < 200;
}
async function bar3() {
  for (let i = 0; i < 500; i++) {
    const valid = await validate(i);
    if (!valid) {
      break; // <-- this
    }
  }
  console.log("finished");
}
bar3();

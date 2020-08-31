// let's find out how 2 async functions work together.

// this function does not stop.
async function routine1(str: string) {
  for (let i = 0; i < 1000; i++) {
    process.stdout.write(str);
  }
}

routine1(".");
routine1("X");
routine1("_");

// this function wait for a Promise with some interval.
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function routine2(str: string, ms: number) {
  for (let i = 0; i < 1000; i++) {
    await delay(ms);
    process.stdout.write(str);
  }
}

routine2(".", 50);
routine2("X", 100);
routine2("_", 200);

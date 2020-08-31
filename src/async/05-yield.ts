function* foo() {
  for (let i = 0; i < 10; i++) {
    yield i;
  }
}

let generator = foo();
console.log(generator.next().value);
console.log(generator.next().value);

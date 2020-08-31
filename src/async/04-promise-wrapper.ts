import * as https from "https";

function getPosts() {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    https
      .get("https://jsonplaceholder.typicode.com/post", (res) => {
        if (res.statusCode !== 200) {
          reject("request failed");
          return;
        }
        res.on("data", (chunk) => {
          chunks.push(chunk);
        });
        res.on("end", () => {
          const fullData = Buffer.concat(chunks);
          const obj = JSON.parse(fullData.toString());
          resolve(obj);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

// approach 1: using then and catch method to handle data and error from Promise.
function example1() {
  const postPromise = getPosts();
  postPromise
    .then((value) => {
      console.log(value);
    })
    .catch((err) => {
      console.error(err);
    });
}
example1();

// approach 2: using await and try/catch to handle data and error from Promise.
async function proc() {
  try {
    const value = await getPosts();
    console.log(value);
  } catch (err) {
    console.error(err);
  }
}

proc();

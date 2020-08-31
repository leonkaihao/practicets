import * as https from "https";

/**
 * For a series of ordered http requests,
 * each one request needs the value of the previous response.
 * we need to create the next request in the previous callback.
 * Thus a callback hell generated.
 * callback hell makes the code difficult to read.
 */
const chunks: any[] = [];

https
  .get("https://jsonplaceholder.typicode.com/posts", (res) => {
    res.on("data", (chunk) => {
      chunks.push(chunk);
    });
    res.on("end", () => {
      const fullData = Buffer.concat(chunks);
      const obj = JSON.parse(fullData.toString());
      https
        .get(
          `https://jsonplaceholder.typicode.com/posts?userId=${obj[0].userId}`,
          (res) => {
            res.on("data", (d) => {
              console.log(d.toString());
            });
          }
        )
        .on("error", (e: any) => {
          console.error(e);
        });
    });
  })
  .on("error", (e: any) => {
    console.error(e);
  });

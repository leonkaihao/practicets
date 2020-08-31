import * as https from "https";

https
  .get("https://jsonplaceholder.typicode.com/posts/1", (res) => {
    console.log(res.statusCode);
  })
  .on("error", (e: any) => {
    console.error(e);
  });

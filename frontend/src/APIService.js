const https = require("https");
const http = require("http");

const useHTTPS = false;

exports.uploadDesign = (tiles) => {
  const postData = JSON.stringify({
    tiles,
  });

  const options = {
    // port: useHTTPS ? 443 : 80,
    path: "/api/upload-design",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": postData.length,
    },
  };

  const client = useHTTPS ? https : http;

  return new Promise((resolve, reject) => {
    const request = client.request(options, (res) => {
      console.log("statusCode:", res.statusCode);
      console.log("headers:", res.headers);

      res.on("data", (d) => {
        console.log(d);
        resolve(d);
      });
    });

    request.on("error", (e) => {
      console.error(e);
      reject(e);
    });

    request.write(postData);
    request.end();
  });
};

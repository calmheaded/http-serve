// 引入模块
var http = require("http");

// fs 模块
var fs = require("fs");

http
  .createServer(function (req, res) {
    var pathname = req.url;
    console.log(pathname, "pathname");
    //路由分发
    if (pathname === "/") {
      pathname = "/index.html";
    }
    if (pathname !== "/favicon.ico") {
      console.log(pathname);
      fs.readFile("static" + pathname, function (err, data) {
        if (err) {
          console.log("404");
          res.write("meiyou");
          res.end();
        } else {
          res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });
          res.write(data);
          res.end();
        }
      });
    }
    console.log(pathname);
  })
  .listen(8001);

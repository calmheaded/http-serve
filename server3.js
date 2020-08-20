// https://www.cnblogs.com/angle6-liu/p/11736682.html
// 引入模块
var http = require("http");

// fs 模块
var fs = require("fs");

// path模块
var path = require("path");

// 自定义模块
var mimeModel = require("./getmime.js");
// function mimeModel(extname) {
//   switch (extname) {
//     case ".html":
//       return "text/html";
//     case ".css":
//       return "text/css";
//     case ".js":
//       return "text/javascript";
//     default:
//       return "text/html";
//   }
// }
http
  .createServer(function (req, res) {
    //http://localhost:8001/news.html  /news.html
    //http://localhost:8001/index.html  /index.html
    //css/dmb.bottom.css

    var pathname = req.url;
    //路由分发
    if (pathname === "/") {
      pathname = "/index.html";
    }

    // 获取后缀名
    var extname = path.extname(pathname);

    if (pathname !== "/favicon.ico") {
      /*过滤请求 favicon.ico*/
      //console.log(pathname);
      //文件操作获取 static 目录下的 index.html  文件
      fs.readFile("static" + pathname, function (err, data) {
        if (err) {
          console.log("404");
          fs.readFile("static/404.html", function (err, data404) {
            if (err) {
              console.log(err);
            }
            res.writeHead("404", {
              "Content-Type": "text/html;charset='utf-8'",
            });
            res.write(data404);
            res.end();
          });
        } else {
          //返回文件
          // 获取文件类型
          var mine = mimeModel.getMime(extname);
          //   var mine = mimeModel(extname);
          console.log(mine, "mine");
          res.writeHead(200, {
            "Content-Type": mine + ";charset='utf-8'",
          });
          res.write(data);
          res.end();
        }
      });
    }
    console.log(pathname);
  })
  .listen(80, "127.0.0.1");

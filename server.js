// // https://www.imooc.com/article/68336
// // http://www.10qianwan.com/articledetail/629162.html

// var fs = require("fs"),
//   url = require("url"),
//   path = require("path"),
//   http = require("http");

// // 从命令行参数获取root目录，默认是当前目录:
// var root = path.resolve(process.argv[2] || ".");
// console.log("Static root dir: " + root);
// // 创建服务器
// var server = http.createServer(function (request, response) {
//   // 获得URL的path，类似 '/css/bootstrap.css':
//   var pathname = url.parse(request.url).pathname;
//   console.log(pathname, "pathname");
//   // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
//   var filepath = path.join(root, pathname);
//   console.log(filepath, "filepath");
//   // 获取文件状态:
//   fs.stat(filepath, function (err, stats) {
//     console.log(stats, "stats");
//     if (!err && stats.isFile()) {
//       // 没有出错并且文件存在:
//       console.log("200 " + request.url);
//       // 发送200响应:
//       response.writeHead(200);
//       // 将文件流导向response:
//       fs.createReadStream(filepath).pipe(response);
//     } else {
//       // 出错了或者文件不存在:
//       console.log("404 " + request.url);
//       // 发送404响应:
//       response.writeHead(404);
//       response.end("404 Not Found");
//     }
//   });
// });
// server.listen(8080);

var http = require("http"), // 引入需要的模块
  fs = require("fs"), //引入文件读取模块
  cp = require("child_process"), // 可自动打开浏览器模块
  url = require("url"),
  path = require("path");

http
  .createServer(function (req, res) {
    var pathname = __dirname + url.parse(req.url).pathname; // 对于文件路径统一处理
    if (path.extname(pathname) == "") {
      pathname += "/html/"; // 欲打开文件的目录
    }
    if (pathname.charAt(pathname.length - 1) == "/") {
      pathname += "index.html"; // 默认打开的文件
    }
    fs.exists(pathname, function (exists) {
      if (exists) {
        switch (
          path.extname(pathname) // 不同文件返回不同类型
        ) {
          case ".html":
            res.writeHead(200, {
              "Content-Type": "text/html",
            });
            break;
          case ".js":
            res.writeHead(200, {
              "Content-Type": "text/javascript",
            });
            break;
          case ".css":
            res.writeHead(200, {
              "Content-Type": "text/css",
            });
            break;
          case ".gif":
            res.writeHead(200, {
              "Content-Type": "image/gif",
            });
            break;
          case ".jpg":
            res.writeHead(200, {
              "Content-Type": "image/jpeg",
            });
            break;
          case ".png":
            res.writeHead(200, {
              "Content-Type": "image/png",
            });
            break;
          case ".json":
            res.writeHead(200, {
              "Content-Type": "text/plain",
            });
            break;
          default:
            res.writeHead(200, {
              "Content-Type": "application/octet-stream",
            });
        }
        fs.readFile(pathname, function (err, data) {
          console.log(new Date().toLocaleString() + " " + pathname);
          res.end(data);
        });
      } else {
        // 找不到目录 时的处理
        res.writeHead(404, {
          "Content-Type": "text/html",
        });
        res.end("<h1>404 Not Found</h1>");
      }
    });
  })
  .listen(8088, "127.0.0.1"); // 监听端口

console.log("Server running at http://127.0.0.1:8088/");

var http = require('http')
var app = http.createServer(handler)
var fs = require('fs');

var model = {};

var socket = require("./model/socket.js");
socket.init(app);

app.listen(80);

var fileType = {
  js : {'Content-Type': 'text/javascript; charset=utf-8'},
  map : {'Content-Type': 'text/javascript; charset=utf-8'},
  css : {'Content-Type': 'text/css; charset=utf-8'},
  html : {'Content-Type': 'text/html; charset=utf-8'},
  page : {'Content-Type': 'text/html; charset=utf-8'},
  jpg : {'Content-Type': 'image/jpeg'},
  png : {'Content-Type': 'image/png'},
  model : {'Content-Type': 'text/javascript; charset=utf-8'},
  "default" : {'Content-Type': 'text/html; charset=utf-8'}
}

function handler (req, res){
  var webContentDir = "./public/";
  var fileUrl = req.url;

  if (fileUrl == "/") {
    fileUrl = "index.html";
  }
  var urlSplitWithDot = fileUrl.split(".");
  if (urlSplitWithDot.length > 0) {
    var fileExeq = urlSplitWithDot[urlSplitWithDot.length-1];
    res.writeHead(200, fileType[fileExeq]);

    switch (fileExeq) {
      case "model":
        var key = urlSplitWithDot[0].replace("/", "");
        model[key].doit(req, res);
      break;
      case "page":
        fileUrl = "index.html";
      default :
        fs.readFile(webContentDir+fileUrl, function (err, content) {
          if (err) {
          } else {
            res.write(content);  
          }
          res.end();
        });
    }
  }

}

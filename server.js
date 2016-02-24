var express = require('express');
var app = express();
var fs = require("fs");
var multer  = require('multer');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
})

var upload = multer({ storage: storage })

app.get('/', function (req, res) {
	console.log( req );
})

app.post('/upload', upload.any(), function (req, res) {
	console.log( req );
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
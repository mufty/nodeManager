var express = require('express');
var app = express();
var fs = require("fs");
var multer  = require('multer');
var vm = require("vm");

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
	fs.readdir('uploads/', function (err, data) {
		if (err) throw err;
		res.json(data);
	});
})

app.get('/execute/:script', function(req, res){
	console.log('script:', req.params.script);
	var path = 'uploads/' + req.params.script + '.js';
	var data = fs.readFileSync(path);
	vm.runInThisContext(data, path);
});

app.post('/upload', upload.any(), function (req, res) {
	console.log( req );
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
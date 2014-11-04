var express = require('express');
var router = express.Router();
var util = require('util');
var fs = require('fs');

router.get('/', function(req, res) {
	res.render("uploadPage", {title: "Nodejs File Uploads Testing for BSB"});
});

router.post("/", function(req, res, next){
	if (req.files){
		console.log(util.inspect(req.files));
		if (req.files.size === 0){
			return next(new Error("Why didn't you select a file?"));
		}
		fs.exists(req.files.myFile.path, function(exists){
			if(exists){
				res.end("File Uploaded Successfully!");
			}else{
				res.end("File upload failed! You suck!");
			}
		});
	}
});
module.exports = router;


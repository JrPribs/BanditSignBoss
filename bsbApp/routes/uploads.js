var express = require('express');
var router = express.Router();
var util = require('util');
var fs = require('fs');
var im = require('imagemagick');

router.get('/', function(req, res) {
    res.render("uploadPage", {
        title: "Nodejs File Uploads Testing for BSB"
    });
});

router.post("/", function(req, res, next) {
    if (req.files) {
        console.log(util.inspect(req.files));
        if (req.files.size === 0) {
            return next(new Error("Why didn't you select a file?"));
        }
        fs.exists(req.files.myFile.path, function(exists) {
            if (exists) {
            	var geoCoords = '';
            	var path = req.files.myFile.path;
                im.readMetadata('./' + path, function(error, metadata) {
                    if (error) throw error;
                    var lat = getDegrees(metadata.exif.gpsLatitude.split(','));
                    var latRef = metadata.exif.gpsLatitudeRef;
                    if (latRef === 'S') {
                        lat = lat * -1;
                    }
                    var lng = getDegrees(metadata.exif.gpsLongitude.split(','));
                    var lngRef = metadata.exif.gpsLongitudeRef;
                    if (lngRef === 'W') {
                        lng = lng * -1;
                    }
                    var coordinate = {
                        lat: lat,
                        lng: lng
                    };
                    geoCoords = coordinate.lat + ' ' + coordinate.lng;
                    console.log(geoCoords);
                });

                function getDegrees(lat) {
                    var degrees = 0;
                    for (var i = 0; i < lat.length; i++) {
                        var cleanNum = lat[i].replace(' ', '');
                        var parts = cleanNum.split('/');
                        var coord = parseInt(parts[0]) / parseInt(parts[1]);
                        if (i == 1) {
                            coord = coord / 60;
                        } else if (i == 2) {
                            coord = coord / 3600;
                        }
                        degrees += coord;
                    }
                    return degrees;
                }

                var upFile = req.files.myFile.name;
                res.render("uploadSuccessPage", {
                    title: "File Uploaded Successfully!",
                    file: upFile,
                    coords: geoCoords
                });
            } else {
                res.end("File upload failed! You suck!");
            }
        });
    }
});
module.exports = router;

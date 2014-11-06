'use strict';

var ExifImage = require('exif').ExifImage;
var async = require('async');
var crypto = require('crypto');

var randomHash = function() {
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    return crypto.createHash('sha1').update(current_date + random).digest('hex');
};

var extractGeo = function(options, callback) {
    var imageOutput = [];

    function doExtract(image, callback) {
        var random = randomHash();
        var imgWithPath = options.path + image;

        function hasCoordinates(image) {
            var gps = image.exif.gps;

            if (gps.GPSLatitude && gps.GPSLongitude) {

                image.coordinates = {
                    latitude: gps.GPSLatitude,
                    longitude: gps.GPSLongitude,
                };
            }

            image.coordinates = false;
            delete image.exif;
            return image;

        }

        new ExifImage({
                image: imgWithPath
            },
            function exifGather(error, exifData) {

                if (error) {
                    callback(error.message);
                } else {

                    var withHasCoordinates = hasCoordinates({
                        name: image,
                        exif: exifData,
                        rFilename: random
                    });

                    imageOutput.push(withHasCoordinates);

                    callback(null);
                }

            });

    };

    async.eachLimit(
        options.images,
        options.limit,
        doExtract,
        function fin(err) {
            callback(imageOutput);
        });
};


/*
var options = {
    path: '../bin/public/images/',
    images: ['20140410_102743.JPG',
        '1.jpg', '2.jpg', '3.jpg',
        '4.jpg', '5.jpg', '6.jpg'
    ],
    limit: 10
}
extractGeo(options, function(images) {
    console.log(images);
});
*/

module.exports.getGeoLoc = extractGeo;

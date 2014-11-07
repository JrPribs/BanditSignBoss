'use strict';

var ExifImage = require('exif').ExifImage;
var async = require('async');
var randomHash = require('./utils').randomHash;

var extractGeo = function(options, callback) {
    var imageOutput = [];

    function doExtract(image, callback) {
        var random = randomHash();
        var imgWithPath = options.path + image;

        function hasCoordinates(image) {
            var gps = image.exif.gps;
            image.coordinates = false;

            if (gps.GPSLatitude && gps.GPSLongitude) {
                image.coordinates = {
                    latitude: gps.GPSLatitude,
                    longitude: gps.GPSLongitude,
                };
            }

            delete image.exif;
            return image;

        }

        (new ExifImage({
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

            }));

    }

    async.eachLimit(
        options.images,
        options.limit,
        doExtract,
        function fin(err) {
            callback(err || imageOutput);
        });
};

/*
extractGeo({
    path: '/',
    images: ['IMG_1705.jpg',
        'IMG_1706.jpg', 'IMG_1714.jpg', 'IMG_1734.jpg',
        'IMG_1707.jpg'
    ],
    limit: 10
}, function(images) {.
    console.log(images);
});
*/

module.exports.getGeoLoc = extractGeo;

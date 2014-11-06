'use strict';

var crypto = require('crypto');

var randomHash = function() {
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    return crypto.createHash('sha1').update(current_date + random).digest('hex');
};


module.exports.randomHash = randomHash;
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	res.render('userProfile', {title: 'User Profile Page', scripts: ['/javascripts/userProfile.js']});
});

module.exports = router;

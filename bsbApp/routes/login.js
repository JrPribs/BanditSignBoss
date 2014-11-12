var express = require('express');
var router = express.Router();
var stormpath = require('stormpath');
var client = null;
var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
var keyfile = homedir + '/.stormpath/apiKey.properties';


router.post('/', function(req, res){
	var authcRequest = {
		username: req.body.user,
		password: req.body.pass
	};
	stormpath.loadApiKey(keyfile, function apiKeyFileLoaded(err, apiKey) {
        if (err) throw err;
        client = new stormpath.Client({
            apiKey: apiKey
        });

        client.getApplications({
            name: 'BSB'
        }, function(err, applications) {
            if (err) throw err;
            app = applications.items[0];
            app.authenticateAccount(authcRequest, function onAuthcresult(err, result){
            	result.getAccount(function(err, account){
            		console.log(account);
            		res.render('userProfile', {user: account});
            	});
            });
        });
    });
});

module.exports = router;
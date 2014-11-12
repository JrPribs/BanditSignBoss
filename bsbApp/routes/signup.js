var express = require('express');
var router = express.Router();
var stormpath = require('stormpath');
var client = null;
var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
var keyfile = homedir + '/.stormpath/apiKey.properties';

router.post('/', function(req, res) {
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
            var account = {
                givenName: req.body.givenName,
                surname: req.body.surname,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                customData: {
                    phone: req.body.phone
                }
            };
            app.createAccount(account, function(err, account) {
            	if(err) throw err;
            	res.render('signup', {user: account});
            });
        });
    });
});

module.exports = router;

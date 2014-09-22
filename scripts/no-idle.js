/*
 * Heroku kills processes which idle for too long. 
 * Hubot sends "keep-alive" pings every minute, but these currently
 * aren't working for some reason....
 * This script just loads the main page every 5 minutes.
 * Gloriously taken from SO:
 * http://stackoverflow.com/questions/5480337/easy-way-to-prevent-heroku-idling
 */

var http = require('http'); //importing http

function startKeepAlive() {
    setInterval(function() {
        var options = {
            host: 'alonzo.herokuapp.com',
            port: 80,
            path: '/'
        };
        http.get(options, function(res) {
            res.on('data', function(chunk) {
                try {
                    // optional logging... disable after it's working
                    console.log("HEROKU RESPONSE: " + chunk);
					console.log('KEEP-ALIVE-REQUEST SUCESS');
                } catch (err) {
                    console.log(err.message);
                }
            });
        }).on('error', function(err) {
            console.log("Error: " + err.message);
        });
    }, 5 * 60 * 1000); // load every 20 minutes
}

startKeepAlive();

module.exports = startKeepAlive;
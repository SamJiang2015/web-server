var express = require('express');
var app = express();
var PORT = 3000;

var middleware = {
	requireAuthentication: function(req, res, next) {
		console.log('privat route hit');
		next();
	},

	logger: function(req, res, next) {
		console.log('Request: ' + new Date().toString() +' '+ req.method + ' ' + req.originalUrl);		
		next();
	}
}

// important to call application-level middleware before the route is set up
//app.use(middleware.requireAuthentication)
app.use(middleware.logger);

app.get('/about',
	middleware.requireAuthentication,  // route-specific middleware
	function(req, res) {
		res.send('About us');
	});

app.use(express.static(__dirname+'/public'));

app.listen(PORT, function() {
	console.log('Express server started listening to port '+PORT);
});

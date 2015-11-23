var jade = require('jade');
var express = require('express');


module.exports = function () {
	var app = express();

	app.use(express.static(__dirname + '/app'));

	app.get('/', function (req, res) {
	    res.redirect('/index.html');
	});

	app.get('/index.html', function (req, res) {
		var template = jade.compileFile('index.jade');
		var html = template();

	    res.set('Content-Type', 'text/html');
	    res.write(html);
	    res.end();
	});


	app.listen(5000, function () {
		console.log('server for wed-api started...');
	});
}

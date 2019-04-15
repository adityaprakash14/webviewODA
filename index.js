var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var https = require("https");
var request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'html')));

app.get('/', function (req, res) {
	res.sendFile(__dirname + "/html/index.html");
});

app.get('/page', function (req, res) {
	let callbackdata = req.query.callbackURL;
	res.sendFile(__dirname + "/html/index.html");
});

app.post('/webParams', function (req, res) {
	var callbackurl;
	req.body.parameters.forEach(parameter => {
		if (parameter.key === 'webview.onDone') {
			callbackurl = parameter.value;
		}
	})
	//update your base URL below
	let targetURL = `YOUR_BASE_URL/page?callbackURL=${callbackurl}`;
	let responseData = {
		'webview.url': targetURL
	}
	res.json(responseData);
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log('listening on' + port)
});

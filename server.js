const express = require('express');
const app = express();
const request = require('request');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/geturl', function(req, res) {
    request({
	'url': req.body.url,
	'headers': {
	    'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
	}
    }, function(err, response, body) {
	res.send(body);
    });
});

http.createServer(app).listen(port);

var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.use('/', express.static(__dirname));
app.get('/', function (req, res) {
	res.send('hi there')
});

app.listen(port, function () {
	console.log('listening on port ' + port)
});
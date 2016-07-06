var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

var pg = require('pg');
var connString = process.env.DATABASE_URL || 'postgres://localhost:5432/davidyeager';

app.use(express.static('public'));

app.get('/api/byDayOfWeek', function (req, res) {
	var client = new pg.Client(connString);
	var results = [];
	client.connect();
	var query = client.query("select date_part('dow', start_dt), avg(energy) from energy_data group by date_part('dow', start_dt) order by 1");
	query.on('row', function(row) {
		results.push(row);
	});
	query.on('end', function() {
		client.end();
		res.json(results);
	});
});

app.get('/api/byHour', function (req, res) {
	var client = new pg.Client(connString);
	var results = [];
	client.connect();
	var query = client.query("select date_part('hour', start_dt), avg(energy) from energy_data group by date_part('hour', start_dt) order by 1");
	query.on('row', function(row) {
		results.push(row);
	});
	query.on('end', function() {
		client.end();
		res.json(results);
	});
});

app.use('/', express.static(__dirname));
app.get('/', function (req, res) {
	res.redirect('/reveal.js/openee.html')
});

app.listen(port, function () {
	console.log('listening on port ' + port)
});
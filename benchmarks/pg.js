var pg = require('../bin');

pg.init(12, {
	'user': 'relive',
	'dbname': 'relive',
	'hostaddr': process.argv[2],
	'password': 'fyfvdcthfd5',
	'port': 6432
});

var count = parseInt(process.argv[3]);
var query = "SELECT NOW()";

var r = 0;
var e = 0;

var mem = 0;

function callback(err, res) {
	if (err !== null) {
		e++;
	}

	mem += process.memoryUsage().heapUsed/1024/1024;

	r++;
	if (r === count) {
		console.log('[NODE-PG] | R:', r, ' | E:', e, ' | T:', Date.now() - t, ' | M:', (Math.round(mem/r*10)/10));
		process.exit();
	}
}

var t = Date.now();
var i = 0;
while (i < count) {
	setTimeout(function() {
		pg.exec(query, callback);
    }, Math.random() * 100);

	i++;
}
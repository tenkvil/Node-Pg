var pg = require('../bin');

pg.init(20, {
  'user': 'relive',
  'dbname': 'relive',
  'hostaddr': process.argv[2],
  'password': 'fyfvdcthfd5',
  'port': 6432
});

var count = parseInt(process.argv[3]);
var query = process.argv[4]  || "SELECT * FROM main.member LIMIT 500";

var r = 0;
var e = 0;

var mem = 0;

function exec() {
  pg.exec(query, callback);
}

function callback(err, res) {
  if (err !== null) {
    e++;
  }

  mem += process.memoryUsage().heapUsed/1024/1024;

  r++;
  if (r === count) {
    console.log('[NODE-PG] | R:', r, ' | E:', e, ' | T:', Date.now() - t, ' | M:', (Math.round(mem/r*10)/10));

  }
}


var t = Date.now();
var i = 0;
while (i < count) {
  exec();
  
  i++;
}

setInterval(function() {
  console.log('[NODE-PG] | M:', (Math.round(process.memoryUsage().heapUsed/1024/1024*10)/10));
}, 1000);


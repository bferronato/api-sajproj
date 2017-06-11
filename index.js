var cool = require('cool-ascii-faces');
var express = require('express');
var mysql = require('mysql');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.get('/nice', function(request, response) {
  response.send("Nice 2x");
});

var con = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASS,
  database : process.env.MYSQLBASE
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/cliente", function(request, response){
con.query('SELECT * from cliente LIMIT 30', function(err, rows, fields) {
	//con.end();
	  if (!err) {
	  	response.send("The solution is: ", rows);
	  	// var d = new Date();
	  	console.log('The solution is: ', new Date());
	  } else {
	  	console.log('Error while performing Query.');
	  }
  });
});


// var con = mysql.createPool({
//   connectionLimit:50,
//   host: process.env.MYSQLHOST,
//   user: process.env.MYSQLUSER,
//   password: process.env.MYSQLPASS,
//   database : process.env.MYSQLBASE
// });



// app.get("/cliente", function(request, response){
// 	con.getConnection(function(error, tempCont) {
// 		if(!!error) {
// 			tempCont.release();
// 			console.log('Erro de conexao');

// 		} else {
// 			console.log('Conectado!');

// 			tempCont.query('SELECT * from cliente LIMIT 30', function(err, rows, fields) {
// 			});
// 		}

// 	});
// con.query('SELECT * from cliente LIMIT 30', function(err, rows, fields) {
// 	//con.end();
// 	  if (!err) {
// 	  	response.send("The solution is: ", rows);
// 	  	// var d = new Date();
// 	  	console.log('The solution is: ', new Date());
// 	  } else {
// 	  	console.log('Error while performing Query.');
// 	  }
//   });
// });



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

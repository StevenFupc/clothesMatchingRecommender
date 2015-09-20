var express = require('express');
var app = express();

var topService = require('./router/topRouter');
var bottomService = require('./router/bottomRouter');
var shoeService = require('./router/shoeRouter');
var recommendationService = require('./router/recommendationRouter');

app.use('/top', topService)
	.use('/bottom', bottomService)
	.use('/shoe', shoeService)
	.use('/recommendation', recommendationService);

app.get('/', function (req, res) {
  res.send('Test localhost OK!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
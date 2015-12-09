var express = require('express');
var app = express();
var server = require('http').Server(app);

app.use(express.static('_site'));

server.listen(process.env.PORT || 2718, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://localhost:%s', port);
    // console.log('App listening at http://%s:%s', host, port);
});


const express = require('express');
const app = express();
const compression = require('compression');

const db = require('./dbqueries');


let secret;

if (process.env.NODE_ENV == 'production') {
    secret = process.env;
} else {
    secret = require('./secrets');
}


app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(require('./build'));
}

app.use(require('body-parser').json());

app.use(express.static('./public'));


// ===== Routes ===== //

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// ===== Server ===== //

const port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log(`Server listening on port ${port}`);
});

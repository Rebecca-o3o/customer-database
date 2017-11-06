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

app.get('/api/overview',function(req,res){
    db.getAllCustomers().then(function(result){
        res.json({
            status: 200,
            customers: result.rows
        });

    }).catch(function(err){
        console.log(err);
        res.json({
            success: false
        });
    });
});

app.get('/api/customer/:customerid', function(req, res) {

    db.getCustomerDetails(req.params.customerid).then(function(result){
        console.log(result);
        res.json({
            status: 200,
            customer: result
        });
    }).catch(function(err){
        console.log(err);
        res.json({
            success: false
        });
    });
});

app.post('/api/customer/delete', function(req,res){

    const customerid = req.body.customerid;

    db.deleteCustomer(customerid).then(function(result){

        res.json({
            success: true
        });
    }).catch(function(err){
        console.log(err);
    });
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// ===== Server ===== //

const port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log(`Server listening on port ${port}`);
});

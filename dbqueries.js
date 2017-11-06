const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || require('./secrets').db);

module.exports.getAllCustomers = function(){
    const queryText = 'SELECT * FROM customers';
    return db.query(queryText);
};

module.exports.getCustomerDetails = function(customerId){
    const queryText = 'SELECT * FROM customers WHERE customerid=$1';
    return db.query(queryText, [customerId]).then((result)=>{
        return result.rows[0];
    }).catch((err)=>{
        console.log(err);
    });
};

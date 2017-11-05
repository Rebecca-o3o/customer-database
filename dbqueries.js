const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || require('./secrets').db);

module.exports.getAllCustomers = function(){
    const queryText = 'SELECT * FROM customers';
    return db.query(queryText);
};

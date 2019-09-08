'use strict';

var mysql = require('mysql');

var pool      =    mysql.createPool({
    connectionLimit : 100,
    waitForConnections : true,
    queueLimit :0,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'database',
    debug    :  true,
    wait_timeout : 28800,
    connect_timeout :10,
    timezone:'utc'
});

module.exports = pool;

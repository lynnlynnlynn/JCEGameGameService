//// Create a MySQL connection pool with
//// a max of 10 connections, a min of 2, and a 30 second max idle time
var Pool  = require('generic-pool').Pool;
var mysql = require('mysql'); // v2.10.x
var pool  = new Pool({
    name     : 'mysql',
    create   : function(callback) {
        var cnn = mysql.createConnection({
            host:'127.0.0.1',
            port:'3306',
            user: 'root',
            password: '123456',
            database: 'JCEGame_Database'
        })

        // parameter order: err, resource
        callback(null, cnn);
    },
    destroy  : function(client) { client.end(); },
    max      : 10,
    // optional. if you set this, make sure to drain() (see step 3)
    min      : 2,
    // specifies how long a resource can stay idle in pool before being removed
    idleTimeoutMillis : 30000,
    // if true, logs via console.log - can also be a function
    log : true
});


// acquire connection - callback function is called
// once a resource becomes available
pool.acquire(function(err, client) {
    if (err) {
        // handle error - this is generally the err from your
        // factory.create function
        console.log("");
    }
    else {
        console.log("获取数据库连接池");
        client.query("select * from jce_user", [], function(err, data) {
            if (err){
                console.log("error:", err);
            }else{
                console.log("数据为:", data);
            }
            // return object back to pool
            pool.release(client);
        });
    }
});

//// Only call this once in your application -- at the point you want
//// to shutdown and stop using this pool.
////pool.drain(function() {
////    pool.destroyAllNow();
////});

//var mysql = require('mysql');
//
//var TEST_DATABASE = 'ceshi';
//var TEST_TABLE = 'user';
//
////创建连接
//var client = mysql.createConnection({
//    user: 'root',
//    password:'123456',
//});
//
//client.connect();
//client.query("use " + TEST_DATABASE);
//
//client.query(
//    'SELECT * FROM '+TEST_TABLE,
//    function selectCb(err, results, fields) {
//        if (err) {
//            throw err;
//        }
//
//        if(results)
//        {
//            for(var i = 0; i < results.length; i++)
//            {
//                console.log("%d\t%s\t%s", results[i].id, results[i].name, results[i].age);
//            }
//        }
//        client.end();
//    }
//);
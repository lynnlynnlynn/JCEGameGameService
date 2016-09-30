/**
 * Created by Lynn on 16/9/27.
 */
var sysConfig = require('config');

var PokerShuffle = require('./lib/poker_shuffle');
var LogHelper    = require("./lib/log_helper");

var pokerShuffle = new PokerShuffle();
var logHelper    = new LogHelper(sysConfig.get('SYS_DEBUG_VERSION'));

var pokerArr = pokerShuffle.shufflePoker();
logHelper.write_debug("poker:"+ pokerArr);

//var http = require('http');
//var clients = [];
//
//
//
///**
// * HTTP server
// */
//var server = http.createServer(function (request, response) {
//    // Not important for us. We're writing socket.io server, not HTTP server
//});
//server.listen(1337);
//
///**
// * socketio server
// */
//var io = require("socket.io").listen(server);
//
////io监听socket事件
//io.on('connection', function (connection) {
//    console.log((new Date()) + ' Connection from origin ' + connection.id + '.');
//    console.log((new Date()) + ' Connection accepted.');
//
//    connection.on('message', function (message) {
//        console.log("接收消息数据:"+message);
//    });
//
//    // user disconnected
//    connection.on('disconnect', function (socket) {
//        console.log("关闭连接:" + socket);
//        delete clients[connection.username];//删除用户的连接
//
//    });
//});
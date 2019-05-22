var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var restRouter = require("./routes/rest");
var redirectRouter = require("./routes/redirect");
var indexRouter = require("./routes/index");
var mongoose = require("mongoose");
var useragent = require("express-useragent");

var redis = require("redis");
var host = process.env.REDIS_PORT_6379_TCP_ADDR;
var port = process.env.REDIS_PORT_6379_TCP_PORT;
var redisClient = redis.createClient(port, host);

var uri = 'mongodb+srv://user:user@tinyurl-vahor.mongodb.net/test?retryWrites=true';
mongoose.connect(uri);

// app.use(session()); // session middleware
// app.use(require('flash')());

app.use("/public", express.static(__dirname + "/public"));

app.use("/node_modules", express.static(__dirname + "/node_modules"));

app.use(useragent.express());

app.use("/api/v1", restRouter);

app.use("/", indexRouter);

app.use("/:shortUrl", redirectRouter);

server.listen(3000);
console.log("Server started at port 3000");

io.on('connection', function (socket) {
    socket.on('registerShortUrl', function (shortUrl) {
        redisClient.subscribe(shortUrl, function () {
            socket.shortUrl = shortUrl;
            console.log("Subscribed to " + shortUrl + " channel via redis");
        });

        redisClient.on('message', function (channel, message) {
            if (message === socket.shortUrl) {
                socket.emit('shortUrlUpdated');
            }
        });
    });

    socket.on('disconnect', function () {
        if (socket.shortUrl == null) return;
        redisClient.unsubscribe(socket.shortUrl, function () {
            console.log("Unsubscribed channel " + socket.shortUrl + " from redis");
        })
    });
});
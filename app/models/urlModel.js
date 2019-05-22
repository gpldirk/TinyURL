var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UrlSchema = new Schema({
    shortUrl: String,
    longUrl: String,
    username: String,
    creationTime: Date
});

var urlModel = mongoose.model("UrlModel", UrlSchema);

module.exports = urlModel;
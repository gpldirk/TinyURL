var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String
});

var userModel = mongoose.model('UserModel', UserSchema);

module.exports = userModel;
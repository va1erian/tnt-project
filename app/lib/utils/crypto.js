var crypto = require('crypto');
//var KEY_SIZE = 20;
//var CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var KEYWORD = "This Key is used for encryption";

exports.encrypt = function (msg) {
    var key = KEYWORD;//randomString(KEY_SIZE, CHARS);
    var hash = crypto.createHmac('sha256', key).update(msg);
    return hash.digest('hex');
};
/*
function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}*/
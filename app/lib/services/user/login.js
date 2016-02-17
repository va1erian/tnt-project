var logger 	= require('../../log/logger');
var request	= require('request');

exports.createUser = function(req, res) {
	res.render('index_not_connected', {title : "createUser"});
};

exports.validateAccount = function(req, res) {
	res.render('index_connected', {title : "validateAccount"});
};

exports.connectUser = function(req, res) {
	res.render('index_connected', {title : "connectUser"});
};

exports.getLostPasswd = function(req, res) {
	res.render('lost_passwd', {title : "getLostPasswd"});
};

exports.setNewPasswd = function(req, res) {
	res.render('index_connected', {title : "setNewPasswd"});
};
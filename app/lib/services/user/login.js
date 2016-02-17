var request	= require('request');

var logger 	= require('../../log/logger');
var validator = require('../../utils/validator');
var crypto = require('../../utils/crypto');

exports.createUser = function(req, res) {
	
	var data = req.body;
	validator( data, function( errors ) {
		if( errors ) {
			res.status(500).json( { success : false, errors : errors } );
		}
		else {
			logger.debug('Encrypting the password');
			data.password = crypto.encrypt( data.password );
			// TO DO : Request the ws for user creation
			res.status(200).json( { success : true } );
		}
	});
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
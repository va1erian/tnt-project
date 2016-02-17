var logger 	= require('../../log/logger');
var request	= require('request');

exports.renderAddress = function(req, res) {
	res.render('address');
};

exports.checkAddress = function(req, res) {
	//res.render('index', {title : "checkAdress"});
};

exports.addAddress = function(req, res) {
	//res.render('index', {title : "addAddress"});
};

exports.deleteAddress = function(req, res) {
	//res.render('index', {title : "deleteAddress"});
};

exports.getListAddresses = function(req, res) {
	//res.render('index', {title : "getListAddresses"});
};
var logger 	= require('../../log/logger');
var request	= require('request');

exports.getProfilInformation = function(req, res) {
	res.render('profil', {title : "getProfilInformation"});
};

exports.setProfilInformation = function(req, res) {
	res.render('profil', {title : "setProfilInformation"});
};
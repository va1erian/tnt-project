var logger 	= require('../../log/logger');
var request	= require('request');

exports.getAllBookmarkedJourney = function(req, res) {
	res.render('journey', {title : "getAllBookmarkedJourney"});
};

exports.addBookmarkedJourney = function(req, res) {
	res.render('journey', {title : "addBookmarkedJourney"});
};

exports.deleteBookmarkedJourney = function(req, res) {
	res.render('journey', {title : "deleteBookmarkedJourney"});
};

exports.deleteBookmarkedJourney = function(req, res) {
	res.render('journey', {title : "deleteBookmarkedJourney"});
};
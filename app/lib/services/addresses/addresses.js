var logger 	= require('../../log/logger');
var request	= require('request');

exports.renderAddress = function(req, res) {
	res.render('address');
};

exports.checkAddress = function(req, res) {
	res.status(200).json({bool: true, formattedAddress: "8 avenue de la déchéance, 91420 Morangui", gps: {gpsLatitude:12.2,gpsLongitude:14.5}});
};

exports.addAddress = function(req, res) {
	//res.render('index', {title : "addAddress"});
};

exports.deleteAddress = function(req, res) {
	//res.render('index', {title : "deleteAddress"});
};

exports.getListAddresses = function(req, res) {
	res.status(200).json([{idAddress: 1,number : 8,street: "Avenue de la déchéance",postalCode: "91420",city:"Morangui",country:"France",gps: {gpsLatitude:12.2,gpsLongitude:14.5}},{idAddress: 2,number : 14,street: "Rue du poulet",postalCode: "91600",city:"Savignou",country:"France",gps: {gpsLatitude:12.2,gpsLongitude:14.5}}]);
};
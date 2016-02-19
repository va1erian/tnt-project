var logger 	= require('../../log/logger');
var request	= require('request');

exports.renderAddress = function(req, res) {
	res.render('address');
};

exports.checkAddress = function(req, res) {
	res.status(200).json({success: true, formattedAddress: "8 Avenue du superbe Kiabi, Saumur, 91000", gps: {gpsLatitude:47.279127,gpsLongitude:-0.064639}});
};

exports.addAddress = function(req, res) {
	res.status(200).json({success: true});
};

exports.deleteAddress = function(req, res) {
	res.status(200).json({success: true});
};

exports.getListAddresses = function(req, res) {
	res.status(200).json([{idAddress: 1,number : 8,street: "Avenue de la déchéance",postalCode: "91420",city:"Morangui",country:"France",gps: {gpsLatitude:12.2,gpsLongitude:14.5}},{idAddress: 2,number : 14,street: "Rue du poulet",postalCode: "91600",city:"Savignou",country:"France",gps: {gpsLatitude:12.2,gpsLongitude:14.5}}]);
};
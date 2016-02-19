var logger 	= require('../../log/logger');
var request	= require('request');

exports.renderAddress = function(req, res) {
	// redirect to the adresses view
	// For the addresses list, when the view is completely charged, an ajax script will invoque
	// the server to get the adresses list
	res.render('address', {title : "Adresses"});
};

exports.checkAddress = function(req, res) {
	
	// request WS to check the address set and return the formatted address. The json by the returned : {success, formattedAddress, gps}
	// return the same json as the ws's
	
	// If error : {success:false, error: '',}
	res.status(200).json({"success":true,"addresses":[{"formattedAddress":"8 Avenue du superbe Kiabi, Saumur, 91000, France","gps":{"gpsLatitude":47.279127,"gpsLongitude":-0.064639}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}},{"formattedAddress":"2591 N High St, Columbus, OH 43202, United States","gps":{"gpsLatitude":40.015124,"gpsLongitude":-83.011842}}]});
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

exports.getAddressModal = function(req, res) {
	res.render('addressModal');
};
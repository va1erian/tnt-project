var request = require('request');

/**
 * 
 * @param {String} 		url : the url (route) of the WS
 * @param {JS Object} 	paramsJS : GET parameters sent to WS. Ex : {param1 : 1, param2 : '2'}
 * @param {Function}	callback : will return 3 parameters : 
 * 		- error: 	the encountred error when calling the WS
 * 		- response:	the http response of the WS
 * 		- body:		the data sent by the WS
 */
exports.get = function(url, paramsJS, callback) {
	var myURL = url + '?';
	for(key in paramsJS) {
	  myURL += key + "=" + paramsJS[key] + "&";
	}
	myURL = myURL.substring(0, myURL.length - 1);
	
	request.get({ url : myURL}, function(error, response, body) {
		callback(error, response, body);
	});
};

/**
 * 
 * @param {String}		url : the url (route) of the WS
 * @param {JS Object}	paramsJS : POST form parameters sent to WS. Ex : {param1 : 1, param2 : '2'}
 * @param {Function}	callback : will return 3 parameters :
 * 		- error:	the encountred error when calling the WS
 * 		- response:	the http response of the WS
 * 		- body:		the data sent by the WS
 */
exports.post = function(url, dataJS, callback) {
	var myURL = url;
	request.get({ url : myURL, form : dataJS}, function(error, response, body) {
		callback(error, response, body);
	});
};
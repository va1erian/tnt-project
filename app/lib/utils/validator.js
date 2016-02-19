var MAIL_SIZE 	= 128;
var MAIL_REGEX 	= /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var logger = require('../log/logger');

function validate(value, regex) {
    if (typeof value == 'undefined') {
        return false;
    } else {
        var regEx = new RegExp(regex);
        return regEx.test(value);
    }
}

exports.validateUser = function( data, callback ) {
	
	var errors = [];
	logger.trace(data);
	try {
		logger.trace(data.firstName);
		if( !data.firstName )
			errors.push( 'Incorrect firstname' );
		logger.trace(data.lastName);
		if( !data.lastName )
			errors.push( 'Incorrect lastname' );
		logger.trace(data.birthDate);
		if( !data.birthDate )
			errors.push( 'Incorrect birth date' );
		logger.trace(data.email);
		if( !data.email || data.email.length > MAIL_SIZE  || !validate(data.email, MAIL_REGEX) )
			errors.push( 'Incorrect email' );
		logger.trace(data.password);
		if( !data.password )
			errors.push( 'Incorrect password' );
		logger.trace(data.gender);
		if( !data.gender )
		errors.push( 'Incorrect gender' );
			
		if( errors.length > 0 ) {
			callback( errors );
		}
		else {
			callback();
		}
	}
	catch( e ) {
		callback( ['Error when trying to validate the user information'] );
	}
	
};
var logger = require('../log/logger.');

var FIRSTNAME_SIZE 	= 64;
var LASTNAME_SIZE 	= 64;
var GENDER_SIZE 	= 1;
var MAIL_SIZE 	= 128;

var MAIL_REGEX 	= /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var DATE_REGEX 	= /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/i;

function validate(value, regex) {
    if (typeof value == 'undefined') {
        return false;
    } else {
        var regEx = new RegExp(regex);
        return regEx.test(value);
    }
}

function checkUser( data, callback ) {
	
	var errors = [];

	try {
		if( !data.firstName || data.firstName.length > FIRSTNAME_SIZE )
			errors.push( 'Incorrect firstname' );
		if( !data.lastName || data.lastName.length > LASTNAME_SIZE )
			errors.push( 'Incorrect lastname' );
		if( !data.birthDate || !validate(data.birthDate, DATE_REGEX) )
			errors.push( 'Incorrect birth date' );
		if( !data.email || data.email.length > MAIL_SIZE  || !validate(data.email, MAIL_REGEX) )
			errors.push( 'Incorrect email' );
		if( !data.gender || data.gender.length > GENDER_SIZE )
		errors.push( 'Incorrect gender' );
			
		if( errors.length > 0 ) {
			callback( errors );
		}
		else {
			callback();
		}
	}
	catch( e ) {
		logger.error('Exception when trying to validate the user information. Exception : ' + e);
		callback( ['Exception when trying to validate the user information'] );
	}
	
}

exports.validateUser = function( data, callback ) {
	
	checkUser(data, function(userErrors) {
		callback(userErrors);
	});
};

exports.validateUserSignUp = function( data, callback ) {
	
	checkUser(data, function(userErrors) {
		var errors = [];
		if(userErrors) {
			errors = userErrors;
		}
		try {
			if( !data.password ) {
				errors.push( 'Incorrect password' );
			}
			if( errors.length > 0 ) {
				callback( errors );
			}
			else {
				callback();
			}
		}
		catch( e ) {
			logger.error('Exception when trying to validate the user information. Exception : ' + e);
			callback( ['Error when trying to validate the user information'] );
		}	
	});
};


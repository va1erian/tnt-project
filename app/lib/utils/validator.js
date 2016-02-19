var MAIL_SIZE 	= 128;
var MAIL_REGEX 	= /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

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

	try {
		if( !data.firstName )
			errors.push( 'Incorrect firstname' );
		if( !data.lastName )
			errors.push( 'Incorrect lastname' );
		if( !data.birthDate )
			errors.push( 'Incorrect birth date' );
		if( !data.email || data.email.length > MAIL_SIZE  || !validate(data.email, MAIL_REGEX) )
			errors.push( 'Incorrect email' );
		if( !data.password )
			errors.push( 'Incorrect password' );
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
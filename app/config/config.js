/**
 * 
 */
var url = 'http://localhost:8088/tnt/';

module.exports = {
		version : "0.0",
		ws: {
			createUser:			url + 'login/createUser',
			validateEmail:		url + 'login/validateEmail',
			authentificate:		url + 'login/authentificate',
			resetPassword:  	url + 'login/resetPassword',
			
			updatePassword:		url + 'user/updatePassword',
			getUserProfile:		url + 'user/getUserProfile',
			updateUserProfile:	url + 'user/updateUserProfile',
			
			checkAddress: 		url + 'address/checkAddress',
			listAddress:		url + 'address/list',
			addAddress:			url + 'address/add',
			deleteAddress:		url + 'address/delete'
		},
		log : {
			useconsole : true,
			file : {
				filename : __dirname + '/../lib/log/tnt.log', 
				timestamp : true, 
				colorize : true, 
				level : 'trace',
				json: false
			},
			console : {
				timestamp : true, 
				colorize : true,  
				json: false,
				level : 'trace'
			},
			levels : {
				trace: 0,
				debug: 1,
				info: 2,
				warn: 3,
				error: 4,
				fatal: 5
			},
			colors : {
				trace: 'cyan',
				debug: 'magenta',
				info: 'green',
				warn: 'yellow',
				error: 'red',
				fatal: 'blue'
			}
		}
};
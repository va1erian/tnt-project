/**
 * 
 */
module.exports = {
		version : "0.0",
		ws: {				
			hostname: '172.0.0.1',
			port: 8080,
			name: ""
		},
		log : {
			useconsole : true,
			file : {
				filename : '../lib/log/tnt.log', 
				timestamp : true, 
				colorize : true, 
				level : 'trace',
				json: false
			},
			console : {
				timestamp : true, 
				colorize : true,  
				json: false,
				level : 'trace',
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
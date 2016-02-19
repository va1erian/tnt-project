/**
 * Logging lib using winston
 */

var winston = require('winston');
var path = require('path');

var logFileOptions = global.config.log.file;

logFileOptions.filename = path.normalize(path.dirname(logFileOptions.filename));

var logger = new ( winston.Logger )({

	transports : [	new (winston.transports.File)(logFileOptions)	],
	levels: global.config.log.levels,
    colors: global.config.log.colors
});

if( global.config.log.useconsole ) {
        logger.add(winston.transports.Console, global.config.log.console);
}

module.exports = logger;

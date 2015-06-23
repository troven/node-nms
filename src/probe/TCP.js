var net 		= require('net');
var util		= require("../lib/util");
var _ 			= require('underscore');

// =============================================================================

/**
	Execute TCP Sockets
**/

module.exports = function(device, options, cb) {

	var client = net.connect(options, function(socket) { 

		// host is online
		cb && cb( null, { isAlive: true } )
		
		client.end()
	});
}
	

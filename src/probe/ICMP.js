/**
	(c) 2015 Troven Software. Authored by Lee Curtis
	
	Licensed under an Apache 2.0 open source license.
**/

var ping 			= require ("ping");

// =============================================================================

/**
	Execute a native ping
**/
module.exports = function(device, options, cb) {

	// execute ping and return Probe-specific result
	ping.sys.probe( device.host() , function(isAlive) {

		// announce contact status
		device.emit(isAlive?"contact":"contact:lost")
		
		if (!isAlive) return

		// host is online
		cb && cb( null, { isAlive: true } )
	});

}


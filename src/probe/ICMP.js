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
		cb && cb( null, { "probe": "ICMP", data: { isAlive: true } } )
});

}


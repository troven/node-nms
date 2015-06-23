/**
	(c) 2015 Troven Software. Authored by Lee Curtis
	
	Licensed under an Apache 2.0 open source license.
**/

var _ 				= require('underscore');
var util 			= require('../lib/util');

// =============================================================================

/**
	Factory method to instantiate new Probe
**/
module.exports = function(options) {

	if (!options) return
	if (!options.probe) throw "Invalid Probe"
	var self = this

	this._checkConfig = function(device, cb) {
		if (!device) return
		if (!device.options.host) throw "Probe requires {{device.host}}"
		if (!device.emit) throw "Device is not EventEmitter"
	}
	
	// interrogate the device
	this.probe = function(device, cb) {
		this._checkConfig(device)
		
		// check if device permits this probe
		if (device.allows  && device.allows(options.probe) ) {
			return
		}

		// time the roundtrip
		var then = new Date().getTime()

		// safely delegate the Probe
		try {
			var probeProxy = util.resolveProxy("probe", options.probe)
			if (!probeProxy) throw "Missing Probe: "+options.probe

			probeProxy(device, options, function(err, result) {
				var response = { meta: self.options, data: result }

				// basic performance monitoring
				var now = new Date().getTime()
				response.meta.responseTime = now - then

				// return to Telemetry
				cb && cb(err, response )
			})
		} catch(e) {
			cb && cb(""+e)
		}
	}

}

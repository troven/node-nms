var _ 				= require('underscore');
var util 			= require('util');

// =============================================================================

/**
	Factory method to instantiate new Probe
**/
module.exports = function(options) {

	if (!options) return
	if (!options.probe) throw "Invalid Probe"
	var self = this

	this.proxy = function(strategy, type) {
		// resolve packages
		// first search local, then probe plug-ins, then global
		try {
			return require("../"+strategy+"/"+type)
		} catch(e) {
			console.log("Failed", e)
			try {
				return require(type+"-"+strategy)
			} catch(e) {
				console.log("Failed #2", e)
				return require(type)
			}
		}
		return false
	}
	
	this._checkConfig = function(device, cb) {
		if (!device) return
		if (!device.options.host) throw "Probe requires {{device.host}}"
		if (!device.emit) throw "Device is not EventEmitter"
	}
	
	this.probe = function(device, cb) {
		this._checkConfig(device)
		
		// check if device permits this probe
		if (device.probes && device.probes[options.probe]==false) {
			return
		}

		// time the roundtrip
		var then = new Date().getTime()

		// safely delegate the Probe
		try {
			var probeProxy = this.proxy("probe", options.probe)
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

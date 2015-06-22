var _ 				= require('underscore');
var util 			= require('util');

// =============================================================================

/**
	Factory method to instantiate new Probe
**/
module.exports = function(options) {

	// create a new Probe
	this.options = options || { "type": "ICMP" };

	var Delegate = false
	
	// resolve packages
	// first search local, then probe plug-ins, then global
	try {
		Delegate = require("../probe/"+options.type)
	} catch(e) {
		try {
			Delegate = require(options.type+"-probe")
		} catch(e) {
			Delegate = require(options.type)
		}
	}
	
	this._checkConfig = function(device, cb) {
		if (!device) return
		if (!device.options.host) throw "Probe requires {{device.host}}"
		if (!device.emit) throw "Device is not EventEmitter"
	}
	
	this.contact = function(device, cb) {
		this._checkConfig(device)
		
		var then = new Date().getTime()
		// attempt safely
		try {
			Delegate(device, options, function(err, result) {
				var now = new Date().getTime()
				// baseline performance monitoring
				result.responseTime = now - then
				cb && cb(err, result)
			})
		} catch(e) {
			cb && cb(""+e)
		}
	}

}

var _ 				= require('underscore');
var util 			= require('util');

// =============================================================================

/**
	Factory method to instantiate new Sensor
**/
module.exports = function(options) {

	if (!options) return;
	this.options = options
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
	
	this.start = function() {

		// resolve and delegate the Sensor
		var sensorProxy = this.proxy("sensor", options.sensor)
		if (!sensorProxy) throw "Missing Sensor: "+options.sensor
		var sensor = sensorProxy(options)
		sensor.start()
	}

}

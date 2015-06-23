/**
	(c) 2015 Troven Software. Authored by Lee Curtis
	
	Licensed under an Apache 2.0 open source license.
**/

var _ 				= require('underscore');
var util 			= require('../lib/util');

// =============================================================================

/**
	Factory method to instantiate new Sensor
**/

module.exports = function(options) {

	if (!options) return;
	this.options = options
	var self = this

	this._checkConfig = function(device, cb) {
		if (!device) return
		if (!device.options.host) throw "Probe requires {{device.host}}"
		if (!device.emit) throw "Device is not EventEmitter"
	}
	
	this.start = function() {

		// resolve and delegate the Sensor
		var sensorProxy = util.resolveProxy("sensor", options.sensor)
		if (!sensorProxy) throw "Missing Sensor: "+options.sensor
		var sensor = sensorProxy(options)
		sensor.start()
	}

}

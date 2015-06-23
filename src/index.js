/**
	(c) 2015 Troven Software. Authored by Lee Curtis
	
	Licensed under an Apache 2.0 open source license.
**/

var nms = module.exports;

// =============================================================================

var events 			= require('events');
var _ 				= require('underscore');

// =============================================================================

nms.init = function(options) {
	this.options = options || {}
}


nms.poll = function(telemetry, interval) {
	if (!telemetry) return
	if (!telemetry.poll || !telemetry.start) throw "Invalid Telemetry"
	
	// poll in 1-minute intervals
	interval = interval>0?interval:1

	// start the Sensors
	telemetry.start()

	// periodically poll
	setInterval(function() {
		telemetry.poll()
	}, (interval*1000) )

}

// export Factories

nms.Device = require('./nms/Device')
nms.Probe = require('./nms/Probe');
nms.Sensor = require('./nms/Sensor');
nms.Telemetry = require('./nms/Telemetry');

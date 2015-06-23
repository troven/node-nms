var nms = module.exports;

// =============================================================================

var events 			= require('events');
var _ 				= require('underscore');

// =============================================================================

nms.init = function(options) {
	this.options = options || {}
	console.log("NMS:", this.options)
}

nms.poll = function(telemetry, interval) {
	if (!telemetry) return
	
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

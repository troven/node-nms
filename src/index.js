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
	
	// default to 1-minute
	interval = interval || 60*1000

	telemetry.start()

	// periodically poll
	setInterval(function() {
		telemetry.poll()
	}, interval)

}

nms.Device = require('./nms/Device')
nms.Probe = require('./nms/Probe');
nms.Sensor = require('./nms/Sensor');
nms.Telemetry = require('./nms/Telemetry');

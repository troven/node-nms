var events 			= require('events');
var _ 				= require('underscore');
var util 			= require('util');

// =============================================================================

/**
	Factory method to instantiate new Telemetry
**/
module.exports = function(options) {
	options = options || {}
	var self = this

	// instantiate Telemetry
	this.options = options || {};
	this._probes = []
	this._devices = []
	this._lastMeasurement = -1;

	// instantiate telemetry
	_.each(this.options.probes, function(p_options) {
	
		var probe = nms.Probe(p_options)
		self.addProbe(probe)
	
	});
	
	// add a Probe
	this.uses = function(probe) {
		if (!probe) return
		if (!probe.contact) throw "Invalid Probe"
		this._probes.push(probe);
	}

	// probes a device
	this.monitors = function(device) {
		if (!device) return
		if (!device.host) throw "Invalid Device"
		this._devices.push(device);
	}
	
	// probe each device
	this.execute = function() {
		// attempt contact with each device for each registered Probe

		_.each(self._devices, function(device) {
			self._contact(device);
		});
		this._lastMeasurement = new Date().getTime()
	}

	// comprehensively probe a device
	// measure response time
	// emit 'probed' events
	
	this._contact = function(device) {
		_.each(self._probes, function(probe) {
			var then = new Date().getTime()

			// run the probe
			probe.contact( device, function(err, result) {

				// evaluate response
				if (err) {
					console.log("error", device.host(), err)
					self.emit("fault", ""+err, probe, device)
					return
				}

				// announce results
				device.emit("probed", result)
				console.log("probed", device.host(), result)
			})
		});
	}
}

util.inherits(module.exports, events.EventEmitter);

/**
	(c) 2015 Troven Software. Authored by Lee Curtis
	
	Licensed under an Apache 2.0 open source license.
**/

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
	this._sensors = []
	this._devices = []
	this._lastMeasurement = -1;

	// instantiate telemetry
	_.each(this.options.probes, function(p_options) {
		var probe = nms.Probe(p_options)
		self.addProbe(probe)
	});
	
	// add a Probe
	this.uses = function(proxy) {
		if (!proxy) return
		var options = proxy.options
		
		if (options.probe) {
			this._probes.push(proxy);
		} else if (options.sensor) {
			this._sensors.push(proxy);
		} else throw "Invalid Probe/Sensor:"+options
	}

	// probes a device
	this.monitors = function(device) {
		if (!device) return
		if (!device.host) throw "Invalid Device"
		this._devices.push(device);
	}
	
	// start all Sensors
	this.start = function() {
		_.each(this._sensors, function(sensor) {
			sensor.start && sensor.start();
		});
		this.emit("start")
	}

	// stop all Sensors
	this.stop = function() {
		_.each(this._sensors, function(sensor) {
			sensor.stop && sensor.stop();
		});
		this.emit("stop")
	}

	// manually probe each device
	this.poll = function() {

		// attempt contact with each device for each registered Probe
		_.each(self._devices, function(device) {
			self.probe(device);
		});

		// housekeeping
		this._lastPoll = new Date().getTime()
		this.emit("poll")
	}

	// comprehensively probe a device
	// measure response time
	// emit 'probed' events
	
	this.probe = function(device) {
		if (!device) return
		if (!device.host) throw "Invalid Device"

		_.each(self._probes, function(probe) {
			var then = new Date().getTime()

			// run the probe
			probe.probe( device, function(err, result) {

				// evaluate response
				if (err) {
					console.log("error", device.host(), err)
					self.emit("fault", ""+err, probe, device)
					return
				}

				// announce results
				device.emit("probe", result)
				self.emit("probe", result)
			})
		});
	}
}

util.inherits(module.exports, events.EventEmitter);

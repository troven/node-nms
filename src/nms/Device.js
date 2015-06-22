var events 			= require('events');
var _ 				= require('underscore');
var util 			= require('util');

// =============================================================================

/**
	Factory method to instantiate new Device
**/

module.exports = function(options) {

	// instantiate Device
	this.options = options || {};
	this._lastContact = -1;
	this._isOnline = null;
	this._services = { "ICMP": true }

	// listen for device state-change events
	this.on("probed", function(result) {
		// do nothing
	})

	this.on("offline", function() {
		this._isOnline = false;
	})
	
	this.on("online", function() {
		this._isOnline = true;
		this._firstContact = new Date().getTime();
	})

	this.on("contact", function(result) {
		// update internal state
		this._lastContact = new Date().getTime();

		// announce state changes
		if (!this._isOnline) this.emit("online");
	})

	this.on("contact:lost", function(result) {
		// announce state changes
		if (this._isOnline!==false) this.emit("offline");
	})
	
	this.isOnline = function() {
		return this._isOnline;
	}
	
	this.host = function() {
		return this.options.host
	}
	
	this.uptime = function() {
		if (!this._firstContact) return 0
		return this._lastContact-this._firstContact
	}
}

// attach events
util.inherits(module.exports, events.EventEmitter);

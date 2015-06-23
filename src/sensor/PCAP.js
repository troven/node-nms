/**
	(c) 2015 Troven Software. Authored by Lee Curtis
	
	Licensed under an Apache 2.0 open source license.
**/

var net 		= require('net');
var util		= require("../lib/util");
var _ 			= require('underscore');

var pcap 		= require('pcap')

// =============================================================================

/**
	Passively listen for network traffic based on libpcap
	Supports packet filtering
**/

module.exports = function(options) {
	if (!options) return
	options.filter = options.filter || "ip proto \\tcp"
	options.interface = options.interface || null
	
	var self = this

	this.start = function() {
		if (self._session) return
		self._session = pcap.createSession(options.interface, options.filter);
		self._session.on("packet", onRawPacket)
	}
					
	this.stop = function() {
		if (!self._session) return
//		self._session.close()
	}
		
	return this
}
	
var onRawPacket = function(raw) {
	var packet = pcap.decode.packet(raw);
	if (!packet) return;

	console.log("pkt", packet.payload.shost.addr, packet.payload.dhost.addr, packet)
	switch (packet.ethertype) {
		case 0x0200:
			onPupPacket(this.options, packet)
			break;
		case 0x0800:
			onIPPacket(this.options, packet)
			break;
		case 0x0806:
			onARPPacket(this.options, packet)
			break;
		default:
			this.emit("pcap:raw", { meta: this.options, data: raw } );
			break;
	}
}

var onPupPacket = function(options, packet) {
	this.emit("pcap:pup", { meta: options, data: packet } );
}

var onIPPacket = function(options, packet) {
	this.emit("pcap:ip", { meta: options, data: packet } );
}

var onARPPacket = function(options, packet) {
	this.emit("pcap:arp", { meta: options, data: packet } );
}


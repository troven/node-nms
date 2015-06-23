/**
	(c) 2015 Troven Software. Authored by Lee Curtis
	
	Licensed under an Apache 2.0 open source license.
**/

var self = module.exports;

// =============================================================================

var nms  = require('./index');

// setup monitoring
var telemetry = new nms.Telemetry()

//telemetry.uses( new nms.Probe( { probe: "ICMP" } ) )
//telemetry.uses( new nms.Probe( { probe: "SNMP", "community": "lee", "oid": [1,3,6,1,2,1,1,3,0] } ) )
//telemetry.uses( new nms.Probe( { probe: "TCP", "port": 8080 } ) )
telemetry.uses( new nms.Sensor( { sensor: "PCAP", "interface": "en0" } ) )

// configure hosts
var localhost = new nms.Device( { host: "localhost" } )
telemetry.monitors(localhost)

// listen for events
localhost.on("online", function() {
	console.log(this.host(), "is online")
})

localhost.on("offline", function() {
	console.log(this.host(), "is offline")
})

telemetry.on("discover", function(device) {
	console.log("discovered", device)
})

// begin polling

console.log("monitoring ...")
nms.poll(telemetry, 1000)


// we're done ....


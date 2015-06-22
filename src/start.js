var self = module.exports;

// =============================================================================

var nms  = require('./index');

// setup monitoring
var telemetry = new nms.Telemetry()
telemetry.uses( new nms.Probe( { type: "ICMP" } ) )
telemetry.uses( new nms.Probe( { type: "SNMP", "community": "lee", "oid": [1,3,6,1,2,1,1,3,0] } ) )

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


nms.poll(telemetry, 1000)


// we're done ....


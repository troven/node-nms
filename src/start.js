var self = module.exports;

// =============================================================================

var nms  = require('./index');

// setup monitoring
var ping = new nms.Probe( { type: "ICMP" } )
var telemetry = new nms.Telemetry()
telemetry.uses(ping)

// configure hosts
var localhost = new nms.Device( { host: "google.com" } )
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


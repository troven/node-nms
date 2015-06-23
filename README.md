NODE-NMS
--------

A light-weight, event-driven, high-speed Network Management kernel for NodeJS. 

node-nms was designed to be embedded into a larger application but it's well suited to head-less DevOps too.

Presently, it measures responsive times and uptime and can passively auto-detect devices. 

We support two monitoring strategies - passive probes and active Sensors. 

Both are easily extended with super-simple plugins.

node-nms emits events when devices come online, go offline or when data is received from a Probe or Sensor.

It's missing central configuration, persistence, a UI, alarms and other not-quite essentials - quite deliberately.

You see, we built node-nms as the underlying engine that (will) power "meta4nms" - an open source, real-time, Infrastructure Analytics application. We hope you'll check that out soon too.

Architecture
------------

The node-nms library is designed to take advantage of NodeJS's event-driven, asychronous architecture.

It uses (and requires) non-blocking IO throughout - so care should be taken when building custom Probes and Sensors that they do not cause a deadlock or perform indulgent algorithms.

There are 4 main components - Devices, Probes, Sensors and Telemetry. They are discussed below.

It's pretty simple really. The exciting part is what you can do with an easy to integrate network telemetry tool inside your environment. 

Installation
------------

That said, it's fairly easy to work with the ./src/start.js file is a good place to start.

	git clone https://github.com/troven/node-nms.git
	cd node-nms
	node src/start

Or, If you're reckless enough to include it into your own projects:

	var nms = require("node-nms")

Usage
-----

Setup a monitored environment / zone using a Telemetry broker:

	var telemetry = new nms.Telemetry()
	
Use Ping, SNMP and Web port scans:

	telemetry.uses( new nms.Probe( { probe: "ICMP" } ) )
	telemetry.uses( new nms.Probe( { probe: "SNMP", "community": "public", "oid": [1,3,6,1,2,1,1,3,0] } ) )
	telemetry.uses( new nms.Probe( { probe: "TCP", "port": 80 } ) )

Or promiscuously listen for network activity:

	telemetry.uses( new nms.Sensor( { sensor: "PCAP", "interface": "en0" } ) )
	
Configure the hosts to be monitored:

	var localhost = new nms.Device( { host: "localhost" } )
	telemetry.monitors(localhost)

Listen for events from Probes or Sensors:

	localhost.on("online", function() {
		console.log(this.host(), "is online")
	})

	localhost.on("offline", function() {
		console.log(this.host(), "is offline")
	})

Start polling ... NOTE: the interval is in seconds. 

	nms.poll(telemetry, 1)

Devices
-------

A device is a simple encapsulation of the settings and state of a monitored endpoint.

The Device maintains minimal internal state - firstContacted, lastContacted & isOnline.

It also provides some convenience methods such as device.host() and device.uptime().

The Telemetry module treats all devices equally and will run the same probes on each registered device.

Devices that don't or can't support a particular Probe can opt-out:

	var localhost = new nms.Device( { host: "localhost", "probes": { "SNMP": false } } )

	console.log(localhost.host(), localhost.allows("SNMP"))

By default, all Probes are enabled. If any explict probes are declared, the list acts as a white-list only
permitting explicitly enabled probes to poll that device. 

Sensors cannot be manually excluded, this will change soon.

Probes
------

A Probe is an active agent, it works by synchronously polling the device for information.

Probes are great for measuring responsive time of remote services using synthetic transactions.

Telemetry data is acquired by listening for "poll" events being emitted from the device.

They are used for remote data collection too, such as with SNMP.

An obvious Probe would interrogate a web page or API service and return parsed results.


	ICMP 	- the classic ping probe
	TCP	 	- simple, effective TCP port probe
	SNMP	- ubiquitious network infrastructure polling

	UDP		- coming soon
	HTTP	- coming soon
	HTTPS	- coming soon
	JMX		- coming soon
	WMI		- coming soon
	Nagios	- coming soon
	SQL		- coming soon

A Probe retains no state between devices or invocations.

Sensors
-------

A Sensor is a reactive agent. It asynchronously listens for events from some source and injects them into 
the NodeNMS core.

As a result, they are much simpler to create and configure. The remote endpoint does most of the work, node-nms should simply make some basic decisions and forward the event to Telemtry.

A sensor is a long-running process - it will listen until it you tell it to stop(). They are quite light weight, and should store no or very minimal state.

Sensors provide situation awareness, a sensor notifies node-nms whenever a new device or service appears.

The PCAP sensor is a good example, another might be observing an IoT node using MQTT

In the next release, a REST-ful API callback will allow 3rd party scripts to inject events.

	PCAP	- device discovery based on libpcap

	REST	- coming soon
	PubSub	- coming soon
	MQ		- coming soon
	XMPP	- coming soon

Telemetry data is acquired by listening for "discover" events being emitted from the Telemetry broker.

Telemetry
---------

The Telemetry class represents a network vantage point from which Sensor can observe and Probe can poll.

Typically, it will be deployed on a small NodeJS server that sends it results back to a central database.

The meta4nms project is a sister project, a self-contained NMS, that uses RethinkDB as a central repository for telemetry data as well as handling correlations, aggregation and analytics.

Auto Discovery
--------------

This is a big and very interesting topic. Here are some ideas to get you started.

1) Simply to listen for "discover" events being emitted from the Telemetry broker. For example, using PCAP whenever a new device uses the network.

2) A manual ping or other Probe sweep across some range of services/devices.

3) Perform a getTable on the SNMP ARP table and use that to seed discovery 

4) Implement SNMP Traps and generate Sensor 'discover' events.

5) any more ideas?

Event Correlation
-----------------

This is another big topic, and one best postponed until another day :-)

Plug Ins
--------

Probe

	module.exports = function(device, options, cb) {
		// measure something
		// trigger meaningful device events
		// return result
	}

Sensor

	module.exports = function(options) {
		// observe something
		// trigger meaningful mode-nms events
		// return result
	}

** A sensor must also implement

Data Modelling
--------------

The data-carrying events that are triggered by node-nms share a unified response format.

	{
		meta: { ... about the agent - usually configuration options ... }
		data: [],
		responseTime: 0
	}

The "data" attribute contains the payload data from the probe or sensor.

License
-------

	(c) 2015 Troven Software. Authored by Lee Curtis and contributors
	Licensed under an Apache 2.0 open source license.

Coming soon
-----------

This is an experimental project, and as such there will be huge bursts of activity and many improvements.

The general contracts - the event signatures and APIs are fairly robust. But ... we make no promises and your mileage may vary as we bump up those versions.

Of course, we'd love you to lend a hand ...

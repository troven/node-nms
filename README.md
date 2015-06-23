NodeNMS
---------

A lightweight, event-driven, high-speed, Network Management framework for NodeJS.

It's acts the engine of meta4nms - a real-time infrastructure analytics application.

The library is designed to take advantage of NodeJS's event-driven architecture.

This makes it ideally suited to high-speed polling.

measures responsive times and being event-driven you can listen for devices coming online/offline etc too.

Currently, it supports two monitoring strategies - probes and sensors.

Both strategies are easily extended with super-simple plugins.

Installation
------------

It's missing central configuration and other niceties - so very much for experimentalists.

That said, it's fairly easy to work with the ./src/start.js file is a good place to start.

	git clone https://github.com/troven/node-nms.git
	cd node-nms
	node src/start

Or, If you're reckless enough to include it into your own projects:

	var nms = require("node-nms")

Usage
-----

Setup a monitored environment / zone using a Telemetry broker

	var telemetry = new nms.Telemetry()
	
Use Ping, SNMP and Web port scans

	telemetry.uses( new nms.Probe( { probe: "ICMP" } ) )
	telemetry.uses( new nms.Probe( { probe: "SNMP", "community": "public", "oid": [1,3,6,1,2,1,1,3,0] } ) )
	telemetry.uses( new nms.Probe( { probe: "TCP", "port": 80 } ) )

	//	telemetry.uses( new nms.Sensor( { sensor: "PCAP", "interface": "en0" } ) )
	
Configure hosts

	var localhost = new nms.Device( { host: "localhost" } )
	telemetry.monitors(localhost)

Listen for events

	localhost.on("online", function() {
		console.log(this.host(), "is online")
	})

	localhost.on("offline", function() {
		console.log(this.host(), "is offline")
	})

Begin polling

	nms.poll(telemetry, 1000)


Probes
------

A probe is an active agent, it works by synchronously polling the device for information.

Probes are great for measuring responsive time of remote services using synthetic transactions.

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

Telemetry data is acquired by listening for "poll" events being emitted from the device.

Sensors
-------

A sensor is a passive agent, it asynchronously listens for events from some source and injects them into 
the NodeNMS core.

Sensors provide situation awareness, a sensor notifies node-nms whenever a new device or service appears.

The PCAP sensor is a good example.

In the next release, a REST-ful API callback will allow 3rd party scripts to inject events.


	PCAP	- device discovery based on libpcap
	REST	- coming soon
	PubSub	- coming soon
	MQ		- coming soon
	XMPP	- coming soon

Telemetry data is acquired by listening for "discover" events being emitted from the Telemetry broker.

Data Modelling
--------------

The data-carrying events that are triggered by node-nms share a unified response format.

	{
		meta: { ... about the agent - usually configuration options ... }
		data: [],
		responseTime: 0
	}

The "data" attribute contains the payload data from the probe or sensor.
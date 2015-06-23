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

	git clone https://github.com/troven/NodeNMS.git
	cd NodeNMS
	node src/start


Probes
------

A probe is an active agent, it works by synchronously polling the device for information.


	ICMP 	- the classic ping probe
	TCP	 	- simple, effective TCP port probe
	SNMP	- ubiquitious network infrastructure polling

Sensors
-------

A sensor is a passive agent, it asynchronously listens for events from some source and injects them into 
the NodeNMS core.

	PCAP	- device discovery based on libpcap

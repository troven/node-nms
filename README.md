NodeNMS
---------

A lightweight, event-driven, high-speed, Network Management framework for NodeJS.

It's acts the engine of meta4nms - a real-time infrastructure analytics dashboard.

Currently, it supports two monitoring strategies - probes and sensors.

Installation
------------

It's missing central configuration and other niceties - so very much for experimentalists.

That said, it's fairly easy to work with the ./src/start.js file is a good place to start.

	git clone https://github.com/troven/NodeNMS.git
	cd NodeNMS
	node src/start


Probes
------

A probe is an active agent, it works by polling the device for information.


	ICMP 	- the classic ping probe
	TCP	 	- simple, effective TCP port probe
	SNMP	- ubiquitious network infrastructure polling

Sensors
-------

A sensor is a passive agent, it listens for events from another source and injects them into 
NodeNMS.

	PCAP	- device discovery based on libpcap

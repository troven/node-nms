/**
	(c) 2015 Troven Software. Authored by Lee Curtis
	
	Licensed under an Apache 2.0 open source license.
**/

var snmp 		= require('snmp-native');
var util		= require("../lib/util");
var _ 			= require('underscore');

// =============================================================================

/**
	Execute SNMP
**/

module.exports = function(device, options, cb) {

	var oid = options.oid
	if (!_.isArray(oid)) throw "Invalid SNMP oid "+oid

	options.port = options.port || 161
	options.community = options.community || "public"
	
	// Create a Session with explicit default host, port, and community.
	var session = new snmp.Session({ 
		host: device.host(), port: options.port, 
		community: options.community });

	var onSNMPResponse = function(err, results) {
		if (err) {
			cb && cb( err )
			return
		}

		// host is online
		device.emit("contact")
		
		//return to probe
		cb && cb( null, results )
		
		session.close()
	}

	getScalarSNMP(session, { oid: oid }, onSNMPResponse )
}

function getScalarSNMP(session, query, cb) {

	console.log("getScalarSNMP", query)

	session.get( query, function (error, varbinds) {
		if (error) {
			cb && cb(error)
		} else {
			var oid = query.oid
			var results = {}
			varbinds.forEach(function(v,k,l) {
				cb && cb(null, { value: v.value } )
			})
		}
	});
}

function getTableSNMP(session, query, cb) {
	session.getSubtree( query, function (error, varbinds) {
		if (error) {
			cb && cb(error)
		} else {
			var oid = query.oid
			var results = {}
			varbinds.forEach(function(v,k,l) {
				var id = util.chopBranch(oid, v.oid)
				util.addToTable(results, id, v.value)
				cb && cb(null, results)
			})
		}
	});
}

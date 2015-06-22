var snmp = require('snmp-native');
var util = require("../lib/util");
var rdb = require('rethinkdb');

// Create a Session with default settings.
var session = new snmp.Session();

// Create a Session with explicit default host, port, and community.
var session = new snmp.Session({ host: 'localhost', port: 161, community: 'lee' });

var oid = [1, 3, 6, 1, 2, 1, 2, 2, 1 ];

rdb.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
	
	rdb.db('meta4nms').tableCreate("test")
	var rdb_table = rdb.db('meta4nms').table("test")
console.log("rdb_table", rdb_table)

	var query = { oid: oid }
	var now = new Date().getTime()

	getTableSNMP(session, query, function(err, results) {
		if (err) throw err

		console.log(">", results)
		var payload = { now: now, meta: query, data: results }
		rdb_table.insert(payload).run(conn, function(err, result) {
			console.log("r>", err, result)
		})
	})
})


function getTableSNMP(session, query, cb) {
	session.getSubtree( query, function (error, varbinds) {
		if (error) {
			cb && cb(error)
		} else {
			var results = {}
			varbinds.forEach(function(v,k,l) {
				var id = util.chopBranch(oid, v.oid)
				util.addToTable(results, id, v.value)
				cb && cb(null, results)
			})
		}
	});
}

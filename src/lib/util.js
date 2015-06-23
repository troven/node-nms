/**
	(c) 2015 Troven Software. Authored by Lee Curtis
	
	Licensed under an Apache 2.0 open source license.
**/

var self = module.exports

var _ = require("underscore")

/*
	compare two arrays returning the suffix-elements.
	if the prefix elements
	are present in the tree, then return the non-matching part of the tree 
*/
self.chopBranch = function(prefix, tree) {
	if (!prefix || !tree) return false
	if (!_.isArray(prefix) || !_.isArray(tree)) return false
	
	prefix.forEach(function(v,k) {
		if (tree[k]!=v) return false
	})
	
	return tree.slice(prefix.length)
}

self.addToTable = function(table, oids, value) {
	if (oids.length!=2) throw "not an oid suffix [column,row]"
	table[oids[1]] = table[oids[1]] || {}
	if (_.isString(value)) value = value.replace(/\0/g, '')
	table[oids[1]][oids[0]] = value
}

self.resolveProxy = function(strategy, type) {
	// resolve packages
	// first search local, then probe plug-ins, then global
	try {
		return require("../"+strategy+"/"+type)
	} catch(e) {
		console.log("Failed", e)
		try {
			return require(type+"-"+strategy)
		} catch(e) {
			console.log("Failed #2", e)
			return require(type)
		}
	}
	return false
}


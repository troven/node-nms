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
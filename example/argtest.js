#!/usr/bin/env node

var su = require( '../lib/sendak-usage.js' );

var parsed = su.parsedown( {
	help : {
		'long-args'   : [ 'help', 'halp' ],
		'description' : 'sets the helpful bit',
		'short-args'  : [ 'h' ],
		'default'     : false,
		'type'        : [ Boolean ]
	}
}, process.argv );

console.log( 'original arguments: ', process.argv );
console.log( parsed );

// I got real tired of the clutter at the top of all these command-line tools.
// So this wraps the things I was doing in some sugary things. Also it makes me
// happy.
//
// @konklone: follow your heart.
//



// Pass me a hash.
//
function parsedown (handlers, argv) { // {{{
	var nopt  = require( 'nopt' )
		, nu    = require( 'nopt-usage' )

		// To be eventually passed to nopt & nopt-usage
		, knownOpts   = { }
		, description = { }
		, defaults    = { }
		, shortHands  = { }

		, aliases     = [ ];

	Object.keys(handlers).forEach( function (handler) {
		var h = handlers[handler];

		description[handler] = h['description'];
		knownOpts[handler]   = h['type'];

		// We have to explode the lists or we get [ [ foo, bar ], [ baz, bletch ] ]
		// instead of [ foo, bar, baz, bletch ]
		//
		if (h['long-args'])  { h['long-args'].forEach( function (a) { aliases.push( a ) } )  }
		if (h['short-args']) { h['short-args'].forEach( function (a) { aliases.push( a ) } ) }

		// This can be false and defined
		//
		if (typeof h['default'] !== 'undefined' ) { defaults[handler] = h['default'] }

		shortHands[handler]  = aliases;

	} );

	p     = nopt( knownOpts, argv );
	usage = nu( knownOpts, shortHands, description, defaults );

	return [
		nopt( knownOpts, argv ),
		nu( knownOpts, shortHands, description, defaults ),
		usage_str( handlers )
	];
} // }}}

exports.parsedown = parsedown;

// Get the longest string from a list
//
function longest (l) { // {{{
	var maxlen = 0;
	l.forEach( function (s) { maxlen = l.length > maxlen ? maxlen : l.length } );
	return maxlen;
} // }}}

// String right padding helper
//
// Stolen from @zaach
//
function rpad(str, length) { // {{{
	while (str.length < length) { str = str + ' ' }
	return str;
} // }}}

function usage_str (args) { // {{{
	var records = [ ];

	Object.keys( args ).forEach( function (argname) {
		var line = '';
		// XXX: Does not include aliases
		//
		line += argname;
		line = rpad( line, longest( Object.keys( args ) + 2 ) );
		line += args[argname]['description'];
		line = rpad( line, longest( Object.keys( args ).map( function (k) { args[k][description] } ) ) + 2 );
		records.push( line );
	} );

	console.log( records );
} // }}}

/* {{{

// Old and busted -
//
var nopt = require('nopt')
	, noptUsage = require('nopt-usage')
	, knownOpts = {
			'help'           : [ Boolean, null ],
		}
	, description = {
			'help'           : 'Sets the helpful bit.'
		}
	, defaults = {
			'help' : false
		}
	, shortHands = {
			'h'            : [ '--help' ],
		}
	, parsed = nopt(knownOpts, process.argv)
	, usage = noptUsage(knownOpts, shortHands, description, defaults)

// New hotness -
//
var parsed = require( 'sendak-usage' ).parse( {
  help: {
    'long-args': [ 'help', 'halp' ],
    'description': 'sets the helpful bit',
    'short-args': [ 'h' ],
    'default': false,
    'type': [ Boolean ],
    'handler': function (p) { usage(); process.exit(0) }
  }
} );

}}} */

// jane@cpan.org // vim:tw=80:ts=2:noet

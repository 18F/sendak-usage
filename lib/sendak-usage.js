// Pass me a hash.
//
function parsedown (handlers, argv) {
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
		shortHands[handler]  = [ h['long-args'], h['short-args'] ]

		// We have to explode the lists or we get [ [ foo, bar ], [ baz, bletch ] ]
		// instead of [ foo, bar, baz, bletch ]
		//
		if (h['long-args'])  { h['long-args'].forEach( function (a) { aliases.push( a ) } )  }
		if (h['short-args']) { h['short-args'].forEach( function (a) { aliases.push( a ) } ) }

		if (h['default'])    { defaults[handler] = h['default'] }

	} );

	p     = nopt( knownOpts, argv );
	usage = nu( knownOpts, shortHands, description, defaults );

	return [
		nopt( knownOpts, argv ),
		nu( knownOpts, shortHands, description, defaults )
	];
}

exports.parsedown = parsedown;

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

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
		usage_str( handlers )
	];
} // }}}

exports.parsedown = parsedown;

// Get the longest string from a list
//
function longest (l) { // {{{
	var maxlen = 0;
	l.shift().forEach( function (s) { if (s.length > maxlen) { maxlen = s.length } } );
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

		// Name of the argument & pad it
		//
		line += '--' + argname;
		line = rpad( line, longest( [ Object.keys( args ) ] ) + 2 );

		// Description
		//
		line += ' ' + args[argname]['description'];

		// Derive the longest argument and pad it
		//
		var descs = [ Object.keys( args ).map( function (k) { return args[k].description } ) ];
		line = rpad( line, longest( descs ) + longest( [ Object.keys( args ) ] ) + 3 );

		// Throw it on the stack
		//
		records.push( line );
	} );

	// Hand it back to the user as a string
	//
	return records.join( "\n" );
} // }}}

// jane@cpan.org // vim:tw=80:ts=2:noet

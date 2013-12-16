// Module Dependencies
var  express      = require( 'express' )
    ,http         = require( 'http' )
    ,path         = require( 'path' )
    ,app          = express()
    ;

// Environment settings
app.set( 'port', process.env.PORT || 3000 );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

// Middlewares
app.use( express.favicon() );
app.use( express.logger('dev') );
app.use( express.bodyParser() );
app.use( express.compress() );
app.use( express.methodOverride() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

// Development only
if ( 'development' == app.get('env') ){
    app.use( express.errorHandler() );
}

// Routing
app.get( '/', function( req, res ){
    res.render( 'index' );
});

// Create the server!
http.createServer( app ).listen( app.get( 'port' ), function( ){
    console.log( 'Express server listening on port ' + app.get( 'port' ) );
});

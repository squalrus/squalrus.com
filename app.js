// Module Dependencies
var  express = require( 'express' )
    ,routes  = require( './routes' )
    ,user    = require( './routes/user' )
    ,http    = require( 'http' )
    ,path    = require( 'path' )
    ,less    = require( 'less-middleware' );

var app = express();

// Environment settings
app.set( 'port', process.env.PORT || 3000 );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'jade' );

// Middlewares
app.use( express.favicon() );
app.use( express.logger('dev') );
app.use( express.bodyParser() );
app.use( express.methodOverride() );
app.use( app.router );
app.use( less({
    src: __dirname + '/theme'
    ,dest: __dirname + '/public/css'
    // ,prefix: '/stylesheets'
    ,compress: true
}) );
app.use( express.static( path.join( __dirname, 'public' ) ) );

// Development only
if ( 'development' == app.get('env') ){
  app.use( express.errorHandler() );
}

app.get( '/', routes.index );
app.get( '/users', user.list );

http.createServer( app ).listen( app.get( 'port' ), function(){
  console.log( 'Express server listening on port ' + app.get( 'port' ) );
});

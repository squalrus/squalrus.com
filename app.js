// Module Dependencies
var  express      = require( 'express' )
    ,routes       = require( './routes' )
    ,http         = require( 'http' )
    ,path         = require( 'path' )
    ,less         = require( 'less-middleware' )
    ,assetManager = require( 'connect-assetmanager' )
    ,assetHandler = require( 'connect-assetmanager-handlers' )
    ;

var app = express();

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
app.use( app.router );

// LESS compiler middleware
app.use( less({
    src: __dirname + '/theme'
    ,dest: __dirname + '/public/css'
    ,prefix: '/css'
    ,compress: true
}) );

// Minification middleware
app.use( assetManager({
    'js': {
        'route': /\/js\/Stream\.js/
        ,'path': './public/js/'
        ,'dataType': 'javascript'
        ,'files': [
            'Stream.js'
            ,'Stream.Github.js'
            ,'Stream.Twitter.js'
        ]
        ,'debug': true
        // Hold off until officially fixed
        // ,'postManipulate': {
        //     '^': [ assetHandler.uglifyJsOptimize ]
        // }
    }
}) );

app.use( express.static( path.join( __dirname, 'public' ) ) );

// Development only
if ( 'development' == app.get('env') ){
  app.use( express.errorHandler() );
}

// Routes
app.get( '/', routes.index );

// Create the server!
http.createServer( app ).listen( app.get( 'port' ), function(){
  console.log( 'Express server listening on port ' + app.get( 'port' ) );
});

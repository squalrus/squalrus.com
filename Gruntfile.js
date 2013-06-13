module.exports = function( grunt ){

    // Project Configuration
    grunt.initConfig({
         pkg: grunt.file.readJSON( 'package.json' )
        ,uglify: {
             options: { }
            ,dist: {
                files: {
                     'public/js/stream.min.js' : ['lib/Stream.js', 'lib/Stream.Github.js', 'lib/Stream.Twitter.js', 'lib/Stream.Tumblr.js']
                }
            }
        }
        ,watch: {
             files: ['<% uglify.dist.files %>']
            ,tasks: ['uglify']
        }
    });

    // Load the plugin that provides the 'uglify' task
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

    // Default tasks
    grunt.registerTask( 'default', ['uglify'] );
};
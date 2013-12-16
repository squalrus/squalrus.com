module.exports = function( grunt ){

    // Project Configuration
    grunt.initConfig({
         pkg: grunt.file.readJSON( 'package.json' )

         // Uglify JS
        ,uglify: {
             options: { }
            ,dist: {
                files: {
                     'public/js/stream.min.js' : ['lib/Stream.js', 'lib/Stream.Github.js', 'lib/Stream.Twitter.js', 'lib/Stream.Tumblr.js']
                }
            }
        }

        // Compile LESS
        ,less: {
            development: {
                options: {
                    compress: true
                }
                ,files: {
                     'public/css/cs.min.css': 'theme/cs.less'
                    ,'public/css/cs.responsive.min.css': 'theme/cs.responsive.less'
                }
            }
        }

        // Watch Directories / Files
        ,watch: {
            files: ["lib/*.js", "theme/*.less", "Gruntfile.js"],
            tasks: ["default"]
        }
    });

    // Load the plugin that provides the 'uglify' task
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-less' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

    // Default tasks
    grunt.registerTask( 'default', ['uglify', 'less'] );
};

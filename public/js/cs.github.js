/**
 * GitHub API for chadschulz.com
 */
 cs.github = ( function(){

    // Variables
    var profileUrl = 'https://api.github.com/users/squalrus'
        ,eventsUrl = 'https://api.github.com/users/squalrus/events'
        ,updateProfile
        ,actionEvents = []
        ,html = [];

    actionEvents[ 'PushEvent' ] = function( data ){
        var payload = data.payload
            ,repo   = data.repo;

        html.push( '<div>pushed ' + payload.commits.length + ' commits to <a href="' + repo.url + '" target="_blank">' + repo.name + '</a></div>' );
    };

    actionEvents[ 'WatchEvent' ] = function( data ){
        html.push( 'watched' );
    };

    actionEvents[ 'CreateEvent' ] = function( data ){
        html.push( 'created' );
    };

    actionEvents[ 'IssueCommentEvent' ] = function( data ){
        html.push( 'commented' );
    };

    actionEvents[ 'PullRequestEvent' ] = function( data ){
        html.push( 'pull requested' );
    };

    updateProfile = function( data ){
        var $el
        ,html = [];

        $el = $( '#github-profile' );

        html.push( '<p>' + data.login + '</p>' );
        html.push( '<img src="' + data.avatar_url + '">' );

        $el.html( html.join( '' ) );
    };

    updateFeed = function( data ){
        var $el;

        $el = $( '#github-feed' );

        data.forEach( function( value, index, array ){
            actionEvents[ value.type ]( value );
        });

        $el.html( html.join( '' ) );
    };

    updateFeed( gitmock );

    // $.ajax({
    //     url: profileUrl
    //     ,success: function( data, status ){
    //         updateProfile( data );
    //     }
    // });

    // $.ajax({
    //     url: eventsUrl
    //     ,success: function( data, status ){
    //         updateFeed( data );
    //     }
    // });

})();
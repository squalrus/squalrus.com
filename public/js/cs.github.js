/**
 * GitHub API for chadschulz.com
 */
 cs.github = ( function(){

    // Variables
    var profileUrl = 'https://api.github.com/users/squalrus'
        ,eventsUrl = 'https://api.github.com/users/squalrus/events'
        ,updateProfile
        ,addEntry
        ,actionEvents = []
        ,html = [];

    addEntry = function( data ){
        var payload = data.payload
            ,repo   = data.repo
            ,date = new Date( data.created_at );

        html.push( '<div class="activity-entry github">' + actionEvents[ data.type ]( payload, repo ) + '<span class="activity-date">' + date + '</span></div>' );
    };

    /**
     * Format a PushEvent
     */
    actionEvents[ 'PushEvent' ] = function( payload, repo ){
        return 'pushed <code>' + payload.commits.length + ' commits</code> to <a href="' + repo.url + '" target="_blank">' + repo.name + '</a>';
    };

    actionEvents[ 'WatchEvent' ] = function( payload, repo ){
        return payload.action + ' watching <a href="' + repo.url + '" target="_blank">' + repo.name + '</a>';
    };

    actionEvents[ 'CreateEvent' ] = function( payload, repo ){
        return 'created <code>' + payload.ref + ' ' + payload.ref_type + '</code> <a href="' + repo.url + '" target="_blank">' + repo.name + '</a>';
    };

    actionEvents[ 'IssueCommentEvent' ] = function( payload, repo ){
        return payload.action + 'comment on issue in repo <a href="' + repo.url + '" target="_blank">' + repo.name + '</a> <span>' + payload.issue.body + '</span>';
    };

    actionEvents[ 'PullRequestEvent' ] = function( payload, repo ){
        return 'pull requested';
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
            addEntry( value );
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
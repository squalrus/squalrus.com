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

        if( actionEvents[ data.type ] ){
            html.push( '<article class="activity-entry github"><i class="icon-github icon-activity"></i><div class="activity-content">' + actionEvents[ data.type ]( payload, repo ) + '<time class="date" datetime="' + date + '">' + date + '</time></div></article>' );
        } else {
            console.log( 'event:' + data.type );
        }
    };

    /**
     * Format a PushEvent
     */
    actionEvents[ 'PushEvent' ] = function( payload, repo ){
        var commit = ( payload.commits.length === 1 ) ? 'commit' : 'commits';
        return '<span class="keyword">pushed</span> <code>' + payload.commits.length + ' ' + commit + '</code> to <a href="' + repo.url + '" target="_blank">' + repo.name + '</a>';
    };

    actionEvents[ 'WatchEvent' ] = function( payload, repo ){
        return '<span class="keyword">starred</span> <a href="' + repo.url + '" target="_blank">' + repo.name + '</a>';
    };

    actionEvents[ 'CreateEvent' ] = function( payload, repo ){
        return '<span class="keyword">created</span> <code>' + payload.ref + ' ' + payload.ref_type + '</code> <a href="' + repo.url + '" target="_blank">' + repo.name + '</a>';
    };

    actionEvents[ 'IssueCommentEvent' ] = function( payload, repo ){
        return '<span class="keyword">commented</span> in repo <a href="' + repo.url + '" target="_blank">' + repo.name + '</a> <span class="quote">' + payload.comment.body + '</span>';
    };

    actionEvents[ 'PullRequestEvent' ] = function( payload, repo ){
        return '<span class="keyword">pull request</span> on <a href="' + repo.url + '" target="_blank">' + repo.name + '</a> <span class="quote">' + payload.pull_request.body + '</span>';
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

    // GITHUB MOCK DATA
    // updateFeed( gitmock );

    // $.ajax({
    //     url: profileUrl
    //     ,success: function( data, status ){
    //         updateProfile( data );
    //     }
    // });

    $.ajax({
        url: eventsUrl
        ,success: function( data, status ){
            updateFeed( data );
        }
    });

})();
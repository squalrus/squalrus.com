/**
 * GitHub API for chadschulz.com
 */
 ActivityStream.prototype.github = function(){

    var url = 'https://api.github.com/users/squalrus/events'
        ,base = 'https://github.com/'
        ,updateStream
        // Types of Github Events
        ,actionEvents = []
        ;

    /**
     * Parse items and convert to stream items
     */
    updateStream = function( data ){
        for( var i = 0; i < data.length; i++ ){
            var payload = data[i].payload
                ,repo   = data[i].repo
                ,date = new Date( data[i].created_at );

            if( actionEvents[ data[i].type ] ){
                this.stream.push( new ActivityItem( date, '<article class="activity-entry github"><i class="icon-github icon-activity"></i><div class="activity-content">' + actionEvents[ data[i].type ]( payload, repo ) + '<time class="date" datetime="' + date + '">' + date + '</time></div></article>') );
            } else {
                console.log( 'event:' + data[i].type );
            }
        }
    };

    /**
     * Format a PushEvent
     */
    actionEvents[ 'PushEvent' ] = function( payload, repo ){
        var commit = ( payload.commits.length === 1 ) ? 'commit' : 'commits';
        return '<span class="keyword">pushed</span> <code>' + payload.commits.length + ' ' + commit + '</code> to <a href="' + base + repo.name + '" target="_blank">' + repo.name + '</a>';
    };

    actionEvents[ 'FollowEvent' ] = function( payload, repo ){
        return '<span class="keyword">followed</span> <a href="' + payload.target.html_url + '" target="_blank">' + payload.target.login + '</a>';
    };

    actionEvents[ 'WatchEvent' ] = function( payload, repo ){
        return '<span class="keyword">starred</span> <a href="' + base + repo.name + '" target="_blank">' + repo.name + '</a>';
    };

    actionEvents[ 'CreateEvent' ] = function( payload, repo ){
        return '<span class="keyword">created</span> <code>' + payload.ref + ' ' + payload.ref_type + '</code> <a href="' + base + repo.name + '" target="_blank">' + repo.name + '</a>';
    };

    actionEvents[ 'IssuesEvent' ] = function( payload, repo ){
        return '<span class="keyword">created issue</span> in repo <a href="' + base + repo.name + '" target="_blank">' + repo.name + '</a> <span class="quote">' + payload.issue.body + '</span>';
    };

    actionEvents[ 'IssueCommentEvent' ] = function( payload, repo ){
        return '<span class="keyword">commented</span> in repo <a href="' + base + repo.name + '" target="_blank">' + repo.name + '</a> <span class="quote">' + payload.comment.body + '</span>';
    };

    actionEvents[ 'PullRequestEvent' ] = function( payload, repo ){
        return '<span class="keyword">pull request</span> on <a href="' + base + repo.name + '" target="_blank">' + repo.name + '</a> <span class="quote">' + payload.pull_request.body + '</span>';
    };

    // AJAX call to Github API
    return $.ajax({
        url: url
        ,success: function( data, status ){
            updateStream( data );
        }
    });

};
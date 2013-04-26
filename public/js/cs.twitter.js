/**
 * Twitter API for chadschulz.com
 */
 cs.twitter = ( function(){

    // Variables
    var searchURL = 'http://search.twitter.com/search.json?callback=?&q='
        ,username = '%40chadschulz'
        ,html = []
        ;

    var updateFeed = function( data ){
        data.results.forEach( function( value, index, array ){
            var date = new Date( value.created_at );

            html.push( '<div class="activity-entry twitter"><i class="icon-twitter icon-activity"></i><div class="activity-content">' + formatTweet( value.text ) + '<span class="date">' + date + '</span></div></div>' );
        });
    };

    var formatTweet = function( data ){
        return '<span class="keyword">twitters</span> ' + data;

    };

    $.ajax({
        url: searchURL + username
        ,dataType: 'json'
        ,success: function( data, status ){
            var el = $( '#twitter-status' );

            updateFeed( data );

            el.html( html );
        }
    });

})();
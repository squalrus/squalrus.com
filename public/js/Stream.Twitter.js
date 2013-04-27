/**
 * Twitter API for chadschulz.com
 */
 ActivityStream.prototype.twitter = function(){

    // Variables
    var url = 'http://search.twitter.com/search.json?callback=?&q=chadschulz'
        ,updateStream
        ,formatTweet
        ;

    /**
     * Parse items and convert to stream items
     */
    updateStream = function( data ){
        var data = data.results;

        for( var i = 0; i < data.length; i++ ){
            var date = new Date( data[i].created_at );

            this.stream.push( new ActivityItem( date, '<div class="activity-entry twitter"><i class="icon-twitter icon-activity"></i><div class="activity-content">' + formatTweet( data[i].text ) + '<span class="date">' + date + '</span></div></div>' ) );
        }
    };

    formatTweet = function( data ){
        return '<span class="keyword">twitters</span> ' + data;

    };

    return $.ajax({
        url: url
        ,dataType: 'json'
        ,success: function( data, status ){
            updateStream( data );
        }
    });

};
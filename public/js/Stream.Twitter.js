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
        var replace = '$1<a href="http://twitter.com/$2">@$2</a>'
            ,regex = /(^|[^@\w])@(\w{1,15})\b/g
            ;

        return data.replace( regex, replace );
    };

    return $.ajax({
        url: url
        ,dataType: 'json'
        ,success: function( data, status ){
            updateStream( data );
        }
    });

};
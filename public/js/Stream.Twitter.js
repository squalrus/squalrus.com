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
        var atReplace   = '$1<a href="http://www.twitter.com/$2" target="_blank">@$2</a>'
            ,linkReplace = '<a href="$1" target="_blank">$1</a>'
            ,hashReplace = '$1<a href="http://search.twitter.com/search?q=%23$2" target="_blank">#$2</a>'
            ,atRegex    = /(^|[^@\w])@(\w{1,15})\b/g
            ,linkRegex  = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i
            ,hashRegex  = /(^|\s)#(\w+)/g
            ;

        data = data.replace( linkRegex, linkReplace );
        data = data.replace( hashRegex, hashReplace );
        data = data.replace( atRegex, atReplace );

        return data;
    };

    return $.ajax({
        url: url
        ,dataType: 'json'
        ,success: function( data, status ){
            updateStream( data );
        }
    });

};
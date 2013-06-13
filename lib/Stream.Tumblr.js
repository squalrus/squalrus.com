/**
 * Tumblr API for chadschulz.com
 */
 ActivityStream.prototype.tumblr = function(){

    // Variables
    var url = 'http://chadschulz.tumblr.com/api/read/json'
        ,updateStream
        ,formatTumble
        ;

    /**
     * Parse items and convert to stream items
     */
    updateStream = function( data ){
        var data = data.posts;

        for( var i = 0; i < data.length; i++ ){
            var date = new Date( data[i].date );

            this.stream.push( new ActivityItem( date, '<div class="activity-entry tumblr"><i class="icon-tumblr icon-activity"></i><div class="activity-content">' + formatTumble( data[i] ) + '<span class="date">' + date + '</span></div></div>' ) );
        }
    };

    formatTumble = function( data ){
        return data[ 'regular-title' ] + ' ' + data[ 'regular-body' ];
    };

    return $.ajax({
        url: url
        ,dataType: 'jsonp'
        ,success: function( data, status ){
            updateStream( data );
        }
    });

};
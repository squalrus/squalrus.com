/**
 * Twitter API for chadschulz.com
 */
 cs.twitter = ( function(){

    // Variables
    var mentionsURL = 'http://search.twitter.com/search.json?q=%40chadschulz';

    $.ajax({
        url: mentionsURL
        ,success: function( data, status ){
            var el = $( '#twitter-status' );
            el.html( data );
        }
    });

})();